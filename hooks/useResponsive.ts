import {useWindowDimensions} from "react-native";

const breakpoints = {
    'xs': 576, // 1
    'sm': 768, // 2
    'md': 992, // 2
    'lg': 1200, // 3
    'xl': 1400, // 3
    'xxl': 1600, // 4
}

type Breakpoint = keyof typeof breakpoints;

export function useResponsive() {

    const {width} = useWindowDimensions();

    const getBreakpoint = () : Breakpoint => {
        for (const [key, value] of Object.entries(breakpoints)) {
            if (width <= value) {
                return key as Breakpoint;
            }
        }

        return 'xxl';
    }

    const getNumColumns = () : number => {

        const columns = {
            'xs': 1,
            'sm': 2,
            'md': 2,
            'lg': 3,
            'xl': 3,
            'xxl': 4,
        } as const;

        const breakpoint: keyof typeof columns = getBreakpoint();

        return columns[breakpoint] ?? 1;
    }

    return {
        breakpoint : getBreakpoint(),
        numColumns: getNumColumns(),
        hasMultipleColumns: getNumColumns() > 1
    }
}