import React from "react";
import Manga from "@mangadex/api/structures/Manga";

export default function MangaArrayConsumer(props: {
    src: Array<Manga>,
    children?: (value: Array<Manga>) => React.ReactNode
}) {
    const context = React.createContext<Array<Manga>>(props.src);
    if (props.children !== undefined) {
        return (
            <context.Consumer>
                {
                    props.children
                }
            </context.Consumer>
        );
    } else {
        return (
            <></>
        );
    }
}