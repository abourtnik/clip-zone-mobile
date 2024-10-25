import {RefObject, useState} from 'react'
import {Dimensions} from 'react-native';
import BottomSheet from "@gorhom/bottom-sheet";
import {VideoType} from "@/types";
import CommentsStack from "@/navigation/CommentsStack";

type Props = {
    video: VideoType,
    bottomSheetRef: RefObject<BottomSheet>
}

const video_height = 242;

export function CommentsBottomSheet ({video, bottomSheetRef}: Props) {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={[Dimensions.get('window').height - video_height]}
            index={-1}
            enablePanDownToClose={true}
            //backdropComponent={backdrop}
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