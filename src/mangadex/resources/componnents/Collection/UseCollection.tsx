import React from "react";
import { Collection } from "../../../api/structures/Collection";

export default function UseCollection<T>(props: {
    src: Collection<T>,
    children: (value: Collection<T>) => React.ReactNode
}) {
    const context = React.createContext<Collection<T>>(props.src);
    return (
        <context.Consumer>
            {
                props.children
            }
        </context.Consumer>
    );
}
