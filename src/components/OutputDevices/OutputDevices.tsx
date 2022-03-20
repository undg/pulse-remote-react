import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Slider from '@mui/material/Slider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import VolumeDownIcon from '@mui/icons-material/VolumeDown'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'

import { Endpoint, sliderMarks } from '../../constant'
import { apiAudioDevices } from '../../api'
import { ExpandAll, ISinkSerialize } from '../../types'
import { volume2percent } from '../../utils'

type IOutputDevices = ExpandAll<ISinkSerialize>[]
// this will violate DRY principle. They should be Sliders with common API interface for in/out/app volume controll, but at first I'll duplicate it to explore REST api first.
export const OutputDevices: React.FC = ({ ...rest }) => {
    const [audioDevices, setAudioDevices] = useState<IOutputDevices>([])

    useEffect(() => {
        apiAudioDevices({ endpoint: Endpoint.volumeInfo }).then(setAudioDevices)
    }, [])

    return (
        <div {...rest}>
            {audioDevices.map(device => (
                <Device {...device} key={device.index} setAudioDevices={setAudioDevices} />
            ))}
        </div>
    )
}

const Device: React.FC<ISinkSerialize & { setAudioDevices: Dispatch<SetStateAction<ISinkSerialize[]>> }> = props => {
    const MAX = 150
    const volume = volume2percent(props.volume[0].value)
    const mute = props.mute
    const name = props.description
    const card = props.index
    const setAudioDevState = props.setAudioDevices

    const [displayVolume, setDisplyVolume] = useState<number>(volume)
    useEffect(() => {
        setDisplyVolume(volume)
    }, [volume])

    const handleChange = (_event: any, newVolume: number | number[]) => {
        setDisplyVolume(newVolume as number)
    }
    const handleChangeCommitted = (_event: any, newVolume: number | number[]) => {
        if (newVolume === volume) return

        apiAudioDevices({ endpoint: Endpoint.volumeSet, value: newVolume as number, card }).then(setAudioDevState)
    }

    const volumeUp = () => {
        apiAudioDevices({ endpoint: Endpoint.volumeUp, card }).then(setAudioDevState)
    }

    const volumeDown = () => {
        apiAudioDevices({ endpoint: Endpoint.volumeDown, card }).then(setAudioDevState)
    }

    const volumeToggle = () => {
        apiAudioDevices({ endpoint: Endpoint.volumeToggle, card }).then(setAudioDevState)
    }

    return (
        <Box mt={2} width="100%">
            <Grid container alignItems="end">
                <Grid item xs={10}>
                    <Typography variant="subtitle1">{name}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <IconButton onTouchEnd={volumeToggle} onMouseUp={volumeToggle}>
                        <VolumeOffIcon color={mute ? 'error' : 'disabled'} />
                    </IconButton>
                </Grid>
            </Grid>
            <Stack spacing={2} direction={{ xs: 'row', sm: 'row' }} alignItems="center">
                <IconButton onTouchEnd={volumeDown} onMouseUp={volumeDown}>
                    <VolumeDownIcon />
                </IconButton>
                <Slider
                    aria-label="Volume"
                    max={MAX}
                    value={displayVolume}
                    step={5}
                    onChange={handleChange}
                    onChangeCommitted={handleChangeCommitted}
                    disabled={mute}
                    marks={sliderMarks}
                />
                <IconButton onTouchEnd={volumeUp} onMouseUp={volumeUp}>
                    <VolumeUpIcon />
                </IconButton>
            </Stack>
        </Box>
    )
}
