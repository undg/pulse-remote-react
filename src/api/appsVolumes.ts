import { apiUrl, Endpoint } from '../constant'
import { ISinkInput } from '../types'

export async function apiGetVolumeInfo() {
    const url = apiUrl + Endpoint.volumeAppsInfo

    const res = await fetch(url)
    const json: ISinkInput[] = await res.json()

    return json
}

export async function apiSetVolumeUpApp(idx: number) {
    const url = apiUrl + Endpoint.volumeUpApp.replace('{index}', String(idx))

    const res = await fetch(url)
    const json: ISinkInput = await res.json()

    return json
}

export async function apiSetVolumeDownApp(idx: number) {
    const url = apiUrl + Endpoint.volumeDownApp.replace('{index}', String(idx))

    const res = await fetch(url)
    const json: ISinkInput = await res.json()

    return json
}

export async function apiSetVolumeApp(idx: number, vol: number) {
    const url = apiUrl + Endpoint.volumeSetApp
        .replace('{index}', String(idx))
        .replace('{vol}', String(vol))

    const res = await fetch(url)
    const json: ISinkInput = await res.json()

    return json
}

export async function apiSetVolumeToggleApp(index: number) {
    const url = apiUrl + Endpoint.volumeToggleApp
        .replace('{index}', String(index))

    const res = await fetch(url)
    const json: ISinkInput = await res.json()

    return json
}
