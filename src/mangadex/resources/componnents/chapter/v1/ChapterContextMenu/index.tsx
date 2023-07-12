import * as ContextMenu from "@radix-ui/react-context-menu";
import React from "react";
import Portal from "./Portal";

type Props = {
    id: string
}

const Context = React.createContext<Props | undefined>(undefined);

function PropsContextProvider({ value, children }: React.PropsWithChildren<{
    value: Props
}>) {
    return (
        <Context.Provider value={value}>{children}</Context.Provider>
    );
}

export function useContextMenuProps() {
    const data = React.useContext(Context);
    if (data == undefined) {
        throw new Error("The Context Menu Context Provider is not implemented");
    } else {
        return data;
    }
}

export default function ChapterContextMenu({ id, children }: React.PropsWithChildren<{
    id: string,
}>) {
    return (
        <ContextMenu.Root>
            <ContextMenu.Trigger>{
                children
            }</ContextMenu.Trigger>
            <PropsContextProvider
                value={{
                    id
                }}
            >
                <Portal />
            </PropsContextProvider>
        </ContextMenu.Root>
    );
}