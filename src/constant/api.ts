export const apiUrl = 'http://192.168.1.222:8448'

export enum Endpoint {
    volumeUp = '/volume/up/{card}',
    volumeDown = '/volume/down/{card}',
    volumeInfo = '/volume/info',
    volumeToggle = '/volume/toggle/{card}',
    volumeSet = '/volume/set/{vol}/{card}',
    volumeAppsInfo = '/sink/input/info',
    volumeUpApp = '/sink/input/up/{index}',
    volumeDownApp = '/sink/input/down/{index}',
    volumeSetApp = '/sink/input/set/{vol}/{index}',
    volumeToggleApp = '/sink/input/toggle/{index}',
}
