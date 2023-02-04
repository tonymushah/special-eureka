import React from "react"
import ReactHotkeys from "react-hot-keys"
import Download_Manga_Modal from "./Dowload_Manga_Modal"

export default function Download_Manga_withHotkeys(props: React.PropsWithChildren<{
    mangaID: string
}>) {
    return (
        <Download_Manga_Modal
            manga_id={props.mangaID}
        >
            {({onOpen}) => (
                <ReactHotkeys
                    keyName={"ctrl+s"}
                    onKeyDown={onOpen}
                >
                    {
                        props.children
                    }
                </ReactHotkeys>
            )}
        </Download_Manga_Modal>
    )
}