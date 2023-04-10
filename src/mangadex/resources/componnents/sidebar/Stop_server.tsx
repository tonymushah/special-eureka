import React from "react";
import * as Chakra from "@chakra-ui/react";
import { Await } from "react-router-dom";
import Side_bar_error_el from "./Side_bar_error_el";
import * as Offline from "../../../api/offline/plugin";

export default function Stop_server(props : {
    callAfter : () => void
}) {
    const toast = Chakra.useToast();
    const toastIdRef = React.useRef<Chakra.ToastId>();
    toastIdRef.current = toast({
        title: "Stoping server ...",
        status: "loading",
        position: "bottom-right"
    })!;

    return (
        <React.Suspense>
            <Await
                resolve={Offline.stop_server()}
                errorElement={
                    <Side_bar_error_el toastId={toastIdRef.current} callAfter={props.callAfter}/>
                }
            >
                {(getted: string) => {
                    toast.update(toastIdRef.current!, {
                        title: "Server Stopped",
                        isClosable: true,
                        duration: 9000,
                        status: "success"
                    });
                    props.callAfter();
                    return (<></>);
                }}
            </Await>
        </React.Suspense>
    );
}
