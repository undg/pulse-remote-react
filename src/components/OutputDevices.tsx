import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Slider from '@mui/material/Slider'
import IconButton from '@mui/material/IconButton'
import VolumeDownIcon from '@mui/icons-material/VolumeDown'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import { Endpoint } from './../constant'
import { apiAudioDevices } from '../api'
import { ISinkSerialize } from '../types'
import { volume2percent } from '../utils'
import { Grid, Typography } from '@mui/material'

export function AudioDevices() {
    const [audioDevices, setAudioDevices] = useState<ISinkSerialize[]>([])

    useEffect(() => {
        apiAudioDevices({ endpoint: Endpoint.volumeInfo }).then(setAudioDevices)
    }, [])

    return (
        <>
            {audioDevices.map(device => (
                <OutputDevices {...device} key={device.index} setAudioDevices={setAudioDevices} />
            ))}
        </>
    )
}

function OutputDevices(props: ISinkSerialize & { setAudioDevices: Dispatch<SetStateAction<ISinkSerialize[]>> }) {
    const MAX = 150
    const volume = volume2percent(props.volume[0].value)
    const mute = props.mute
    const description = props.description
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

    const marks = [
        { value: 0, label: '0%' },
        { value: 50, label: '50%' },
        { value: 100, label: '100%' },
        { value: 150, label: '150%' },
    ]

    return (
        <Box mt={2} width="100%">
            <Grid container alignItems="end">
                <Grid item xs={10}>
                    <Typography variant="subtitle1">{description}</Typography>
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
                    marks={marks}
                />
                <IconButton onTouchEnd={volumeUp} onMouseUp={volumeUp}>
                    <VolumeUpIcon />
                </IconButton>
            </Stack>
        </Box>
    )
}
