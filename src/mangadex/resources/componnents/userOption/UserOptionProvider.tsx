import React from "react";
import UserOptions from "@mangadex/api/internal/UserOptions";

const userOptions = new UserOptions();

const context = React.createContext(userOptions);
context.displayName = "Mangadex User Options";

export default function UserOptionProvider(props : React.PropsWithChildren){
    return (
        <context.Provider
            value={userOptions}
        >
            {
                props.children
            }
        </context.Provider>
    )
}

export function UserOptionConsumer(props : {
    children : (value : UserOptions) => React.ReactNode
}){
    return (
        <context.Consumer>
            {props.children}
        </context.Consumer>
    )
}

export function useUserOption(){
    return React.useContext(context);
}