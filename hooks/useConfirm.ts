import {useCallback, useContext} from "react";
import {ConfirmContext, Params} from "@/contexts/ConfirmContext";
export function useConfirm() {
    const { confirmRef } = useContext(ConfirmContext);
    return {
        confirm: useCallback(
            (p: Params) => {
                return confirmRef.current(p);
            },
            [confirmRef]
        ),
    };
}