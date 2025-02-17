import {useState, useEffect} from "react";
import * as ScreenOrientation from 'expo-screen-orientation';


export function useOrientation () {

    const [orientation, setOrientation] = useState<ScreenOrientation.Orientation>(ScreenOrientation.Orientation.PORTRAIT_UP);

    useEffect(() => {
        const onOrientationChange = (currentOrientation: ScreenOrientation.OrientationChangeEvent) => {
            const value = currentOrientation.orientationInfo.orientation;
            setOrientation(value);
        };

        const screenOrientationListener = ScreenOrientation.addOrientationChangeListener(onOrientationChange);

        return () => {
            ScreenOrientation.removeOrientationChangeListener(screenOrientationListener)
        };

    }, []);

    return orientation;
}