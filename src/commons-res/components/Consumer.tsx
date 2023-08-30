import React from "react";

export default function Consumer<T>(props: {
    to_consume: T,
    children: (value: T) => React.ReactNode
}) {
    const context = React.useMemo(() => {
        return React.createContext<T>(props.to_consume);
    }, [props.to_consume]);
    return (
        <context.Consumer>
            {
                props.children
            }
        </context.Consumer>
    );
}