import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Slider from '@mui/material/Slider'
import { Button } from '@mui/material'
import { apiUrl, Endpoint } from './../constant'
import { VolumeResponseJson } from '../api'

export function VolumeSlider() {
    const MAX = 150
    const MIN = 0
    const [volume, setVolume] = useState<number>(MIN)
    const [mute, setMute] = useState<boolean>(false)

    useEffect(() => {
        setVolumeFromRes(Endpoint.volumeInfo, setVolume)
    }, [])

    const handleChange = (event: Event, newValue: number | number[]) => {
        setVolume(newValue as number)
    }

    const volumeUp = () => {
        setVolumeFromRes(Endpoint.volumeUp, setVolume)
    }

    const volumeDown = () => {
        setVolumeFromRes(Endpoint.volumeDown, setVolume)
    }

    const volumeToggle = () => {
        setVolumeFromRes(Endpoint.volumeToggle, setVolume)
    }

    return (
        <Box>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <Button variant="outlined" onClick={volumeDown}>
                    -
                </Button>
                <Slider aria-label="Volume" max={MAX} value={volume} step={10} onChange={handleChange} />
                <Button variant="outlined" onClick={volumeUp}>
                    +
                </Button>
                <Button variant="outlined" onClick={volumeToggle}>
                    M
                </Button>
            </Stack>
        </Box>
    )
}

async function setVolumeFromRes(endpoint: Endpoint, setVolume: React.Dispatch<React.SetStateAction<number>>) {
    const res = await fetch(apiUrl + endpoint)
        const json: VolumeResponseJson = await res.json()
        const volume = Math.round(json[0].volume[0].value * 100)
        setVolume(volume)
}

