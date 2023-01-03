import React from "react";
import * as Chakra from "@chakra-ui/react";
import Side_bar_error_el from "./Side_bar_error_el";
import { Await } from "react-router-dom";
import * as Offline from "../../../api/offline/plugin";

export default function Launch_server(props : {
    callAfter : () => void
}) {
    const toast = Chakra.useToast();
    const toastIdRef = React.useRef<Chakra.ToastId>();
    toastIdRef.current = toast({
        title: "Starting server ...",
        status: "loading",
        position: "bottom-right"
    })!

    return (
        <React.Suspense>
            <Await
                resolve={Offline.launch_server()}
                errorElement={
                    <Side_bar_error_el toastId={toastIdRef.current} callAfter={props.callAfter}/>
                }
            >
                {(getted: string) => {
                    toast.update(toastIdRef.current!, {
                        title: "Server Started",
                        isClosable: true,
                        duration: 9000,
                        status: "success"
                    });
                    props.callAfter();
                    return (<></>);
                }}
            </Await>
        </React.Suspense>
    )
}
