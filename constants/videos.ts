import {IconSource} from "react-native-paper/lib/typescript/components/Icon";

export enum STATUS {
    PUBLIC,
    PRIVATE,
    PLANNED,
    UNLISTED,
    DRAFT,
    BANNED,
    FAILED
}

export const STATUS_ICON: Record<number, IconSource> = {
    0: 'earth',
    1: 'lock',
    2: 'clock-outline',
    3: 'eye-off-outline',
    4: 'file',
    5: 'cancel',
    6: 'alert-circle',
};