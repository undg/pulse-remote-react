export type VolumeResponseJson = IRootObjectItem[];

interface IRootObjectItem {
    volume: IVolumeItem[];
    description: string;
    name: string;
    index: number;
    mute: number;
    raw: string;
}
interface IVolumeItem {
    name: string;
    value: number;
}

