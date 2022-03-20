import { apiUrl, Endpoint } from '../constant'
import { ISinkInput } from '../types'

export async function apiGetVolumeInfo() {
    const url = apiUrl + Endpoint.volumeAppsInfo

    const res = await fetch(url)
    const json: ISinkInput[] = await res.json()

    return json
}

export async function apiSetVolumeUpApp(idx: number) {
    const url = apiUrl + Endpoint.volumeUpApp.replace('{idx}', String(idx))

    const res = await fetch(url)
    const json: ISinkInput = await res.json()

    return json
}

export async function apiSetVolumeDownApp(idx: number) {
    const url = apiUrl + Endpoint.volumeDownApp.replace('{idx}', String(idx))

    const res = await fetch(url)
    const json: ISinkInput = await res.json()

    return json
}
