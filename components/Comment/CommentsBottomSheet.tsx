import {RefObject, useState} from 'react'
import {Dimensions} from 'react-native';
import BottomSheet, {BottomSheetBackdrop} from "@gorhom/bottom-sheet";
import {VideoType} from "@/types";
import CommentsStack from "@/navigation/CommentsStack";

type Props = {
    video: VideoType,
    bottomSheetRef: RefObject<BottomSheet>
}

export function CommentsBottomSheet ({video, bottomSheetRef}: Props) {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={[Dimensions.get('window').height]}
            enableDynamicSizing={false}
            index={-1}
            enablePanDownToClose={true}
            backdropComponent={(props) => (
                <BottomSheetBackdrop
                    {...props}
                    disappearsOnIndex={-1}
                    appearsOnIndex={0}
                    opacity={0.5}
                />
            )}
            onChange={(index: number) => {
                if (index === 0) {
                    setOpen(true)
                }
            }}
        >
            {open && <CommentsStack video={video}/>}
        </BottomSheet>
    );
}