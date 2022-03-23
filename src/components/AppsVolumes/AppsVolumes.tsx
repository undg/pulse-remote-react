import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { apiGetVolumeInfo, apiSetVolumeApp, apiSetVolumeDownApp, apiSetVolumeToggleApp, apiSetVolumeUpApp } from '../../api'
import { ExpandAll, IVolumeInfo } from '../../types'
import VolumeDownIcon from '@mui/icons-material/VolumeDown'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import Stack from '@mui/material/Stack'
import Slider from '@mui/material/Slider'
import { volume2percent } from '../../utils'
import { sliderMarks } from '../../constant'

type IAppVolume = ExpandAll<IVolumeInfo>

export const AppsVolumes: React.FC = () => {
    const [apps, setApps] = useState<IAppVolume[]>([])

    useEffect(() => {
        apiGetVolumeInfo().then(setApps)
    }, [])

    return (
        <>
            {apps.map(app => (
                <AppSlider {...app} key={app.index} />
            ))}
        </>
    )
}

const AppSlider = (props: IAppVolume) => {
    const MAX = 150
    const volume = volume2percent(props.volume)

    const name = props.name
    const index = props.index


    const [displayVolume, setDisplyVolume] = useState<number>(volume)
    const [mute, setMute] = useState<boolean>(props.mute)

    useEffect(() => {
        setDisplyVolume(volume)
    }, [volume])

    const handleChange = (_event: any, newVolume: number | number[]) => {
        setDisplyVolume(newVolume as number)
    }
    const handleChangeCommitted = (_event: any, newVolume: number | number[]) => {
        if (newVolume === volume) return
        apiSetVolumeApp(index, newVolume as number)
    }

    const volumeUp = async () => {
        const res = await apiSetVolumeUpApp(index)
        setDisplyVolume(volume2percent(res.volume))
    }

    const volumeDown = async () => {
        const res = await apiSetVolumeDownApp(index)
        setDisplyVolume(volume2percent(res.volume))
    }

    const volumeToggle = async () => {
        const res = await apiSetVolumeToggleApp(index)
        setMute(res.mute)
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
