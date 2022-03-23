import { apiUrl, Endpoint } from '../constant'
import { IVolumeInfo } from '../types'

async function fetchJson(url: string) {
    const res = await fetch(url)
    const json: IVolumeInfo | IVolumeInfo[] = await res.json()
    return json
}

export async function apiGetVolumeInfo() {
    const url = apiUrl + Endpoint.volumeAppsInfo
    return (await fetchJson(url)) as IVolumeInfo[]
}

export async function apiSetVolumeUpApp(idx: number) {
    const url = apiUrl + Endpoint.volumeUpApp.replace('{index}', String(idx))
    return (await fetchJson(url)) as IVolumeInfo
}

export async function apiSetVolumeDownApp(idx: number) {
    const url = apiUrl + Endpoint.volumeDownApp.replace('{index}', String(idx))
    return (await fetchJson(url)) as IVolumeInfo
}

export async function apiSetVolumeApp(idx: number, vol: number) {
    const url = apiUrl + Endpoint.volumeSetApp.replace('{index}', String(idx)).replace('{vol}', String(vol))
    return (await fetchJson(url)) as IVolumeInfo
}

export async function apiSetVolumeToggleApp(index: number) {
    const url = apiUrl + Endpoint.volumeToggleApp.replace('{index}', String(index))
    return (await fetchJson(url)) as IVolumeInfo
}
