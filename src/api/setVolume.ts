import { apiUrl, Endpoint } from '../constant'
import { ISinkSerialize } from '../types'

interface SetVolumeFromRes {
    endpoint: Endpoint
    value?: number
    card?: number
}

export async function apiAudioDevices({ endpoint, value = 0, card = 0 }: SetVolumeFromRes) {
    const url = apiUrl + endpoint
        .replace('{card}', card.toString())
        .replace('{vol}', value.toString())

    const res = await fetch(url)
    const json: ISinkSerialize[] = await res.json()

    return json
}
