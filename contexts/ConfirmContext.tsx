import {ComponentProps, createContext, useRef, PropsWithChildren, useState, useContext} from "react";
import {Confirm} from "@/components/commons/Confirm";

export type Params = Partial<Omit<ComponentProps<typeof Confirm> , "open" | "onConfirm" | "onCancel">>

const defaultFunction = (p?: Params) => Promise.resolve(true); // En l'absence de contexte, on renvoie true directement

const defaultValue = {
    confirmRef: {
        current: defaultFunction,
    },
};

export const ConfirmContext = createContext(defaultValue);

export function ConfirmContextProvider({ children }: PropsWithChildren) {
    const confirmRef = useRef(defaultFunction);
    return (
        <ConfirmContext.Provider value={{ confirmRef }}>
            {children}
            <ConfirmDialogWithContext />
        </ConfirmContext.Provider>
    );
}

function ConfirmDialogWithContext() {
    const [open, setOpen] = useState(false);
    const [props, setProps] = useState<undefined | Params>();
    const resolveRef = useRef((v: boolean) => {});
    const { confirmRef } = useContext(ConfirmContext);
    confirmRef.current = (props) =>
        new Promise((resolve) => {
            setProps(props);
            setOpen(true);
            resolveRef.current = resolve;
        });

    const onConfirm = () => {
        resolveRef.current(true);
        setOpen(false);
    };

    const onCancel = () => {
        resolveRef.current(false);
        setOpen(false);
    };
    return (
        <Confirm
            onConfirm={onConfirm}
            onCancel={onCancel}
            open={open}
            {...props}
        />
    );
}