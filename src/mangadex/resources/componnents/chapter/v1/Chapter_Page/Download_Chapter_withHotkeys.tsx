import { Mangadex_suspense } from "@mangadex/index";
import React from "react";
import ReactHotkeys from "react-hot-keys";

const Download_Chapter_Modal = React.lazy(() => import("@mangadex/resources/componnents/chapter/Download_Chapter_Modal"));

export default function Download_Chapter_withHotkeys(props: React.PropsWithChildren<{
    chap_id: string
}>) {
    return (
        <Mangadex_suspense>
            <Download_Chapter_Modal
                chap_id={props.chap_id}
            >
                {({ onOpen }) => (
                    <ReactHotkeys
                        keyName={"ctrl+s"}
                        onKeyDown={onOpen}
                    >
                        {
                            props.children
                        }
                    </ReactHotkeys>
                )}
            </Download_Chapter_Modal>
        </Mangadex_suspense>
    );
}