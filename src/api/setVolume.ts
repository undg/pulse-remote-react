import { apiUrl, Endpoint } from "../constant"
import { VolumeResponseJson } from "./types"

interface SetVolumeFromRes {
    endpoint: Endpoint
    setVolume: React.Dispatch<React.SetStateAction<number>>
    setMute?: React.Dispatch<React.SetStateAction<boolean>>
    value?: number | false
}

export async function changeVolume({ endpoint, setVolume, setMute, value = false }: SetVolumeFromRes) {
    const res =
        value === false
            ? await fetch(apiUrl + endpoint)
            : await fetch(apiUrl + endpoint.replace('{vol}', value.toString()))

    const json: VolumeResponseJson = await res.json()
    const volume = Math.round(json[0].volume[0].value * 100)
    const mute = json[0].mute === 1

    setVolume(volume)

    if(setMute)
        setMute(mute)

    console.log(endpoint, json)

    return json
}

