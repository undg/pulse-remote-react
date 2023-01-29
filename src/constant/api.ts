export const apiUrl = 'http://192.168.1.222:8448'
// export const apiUrl = 'http://localhost:8448'

// prettier-ignore
export enum Endpoint {
    volumeUp        = '/volume-device-out/up/{card}',
    volumeDown      = '/volume-device-out/down/{card}',
    volumeInfo      = '/volume-device-out/info',
    volumeToggle    = '/volume-device-out/toggle/{card}',
    volumeSet       = '/volume-device-out/set/{vol}/{card}',
    volumeAppsInfo  = '/volume-app/info',
    volumeUpApp     = '/volume-app/up/{index}',
    volumeDownApp   = '/volume-app/down/{index}',
    volumeSetApp    = '/volume-app/set/{vol}/{index}',
    volumeToggleApp = '/volume-app/toggle/{index}',
}
