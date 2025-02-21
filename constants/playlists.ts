import {IconSource} from "react-native-paper/lib/typescript/components/Icon";

export enum STATUS {
    PUBLIC,
    PRIVATE,
    UNLISTED,
}

export const STATUS_ICON: Record<number, IconSource> = {
    0: 'earth',
    1: 'lock',
    2: 'eye-off-outline',
};