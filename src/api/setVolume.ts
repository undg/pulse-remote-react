import { apiUrl, Endpoint } from '../constant'
import { ISinkSerialize } from '../types'

interface SetVolumeFromRes {
    endpoint: Endpoint
    value?: number | null
    card?: number
}

export async function apiAudioDevices({ endpoint, value = null, card = 0 }: SetVolumeFromRes) {
    const res =
        value === null
            ? await fetch(apiUrl + endpoint.replace('{card}', card.toString()))
            : await fetch(apiUrl + endpoint.replace('{card}', card.toString()).replace('{vol}', value.toString()))

    const json: ISinkSerialize[] = await res.json()

    console.log(endpoint, json)

    return json
}
