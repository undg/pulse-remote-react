import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Slider from '@mui/material/Slider'
import IconButton from '@mui/material/IconButton'
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { Endpoint } from './../constant'
import { changeVolume } from '../api'

export function VolumeSlider() {
    const MAX = 150
    const MIN = 0
    const [volume, setVolume] = useState<number>(MIN)
    const [mute, setMute] = useState<boolean>(false)

    useEffect(() => {
        changeVolume({ endpoint: Endpoint.volumeInfo, setVolume })
    }, [])

    const handleChange = (_any: any, newVolume: number | number[]) => {
        if (newVolume === volume) return
        changeVolume({ endpoint: Endpoint.volumeSet, setVolume, value: newVolume as number })
    }

    const volumeUp = () => {
        changeVolume({ endpoint: Endpoint.volumeUp, setVolume })
    }

    const volumeDown = () => {
        changeVolume({ endpoint: Endpoint.volumeDown, setVolume })
    }

    const volumeToggle = () => {
        changeVolume({ endpoint: Endpoint.volumeToggle, setVolume, setMute })
    }

    const marks = [
        { value: 0, label: '0%' },
        { value: 50, label: '50%' },
        { value: 100, label: '100%' },
        { value: 150, label: '150%' },
    ]

    return (
        <Box>
            <Stack alignItems="end">
                <IconButton onTouchEnd={volumeToggle} onMouseUp={volumeDown}>
                    <VolumeOffIcon color={mute ? "error" : "disabled"} />
                </IconButton>
            </Stack>
            <Stack spacing={2} direction={{ xs: 'row', sm: 'row' }} alignItems="center">
                <IconButton onTouchEnd={volumeDown} onMouseUp={volumeDown}>
                    <VolumeDownIcon />
                </IconButton>
                <Slider
                    aria-label="Volume"
                    max={MAX}
                    value={volume}
                    step={5}
                    onChange={handleChange}
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
