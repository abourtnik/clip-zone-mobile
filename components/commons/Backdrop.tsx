import {BottomSheetBackdrop, BottomSheetBackdropProps} from "@gorhom/bottom-sheet";

export const backdrop = (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={1}
            appearsOnIndex={2}
        />
);