import {MD3LightTheme, MD3DarkTheme} from "react-native-paper";
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const Light = {
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        ...MD3LightTheme.colors,
        background: '#F4F6F9',
        secondaryBackground: '#FFFFFFFF',
        secondary : '#606060'
    },
};

export const Dark = {
    dark: true,
    colors: {
        ...DarkTheme.colors,
        ...MD3DarkTheme.colors,
        secondaryBackground: '#000',
        secondary : '#aaa'
    },
};