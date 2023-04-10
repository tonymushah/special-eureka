import { ToastId, useToast } from "@chakra-ui/react";
import React from "react";
import * as Offline from "../../../api/offline/plugin";

export function launch_server(){
    const toast = useToast();
    const toastIdRef = React.useRef<ToastId>();
    toastIdRef.current = toast({
        title : "Starting server ...",
        status : "loading",
        position : "bottom-right"
    })!;
    return (
        <React.Suspense>
            
        </React.Suspense>
    );
}

export async function stop_server() : Promise<string>{
    const toast = useToast();
    const toastIdRef = React.useRef<ToastId>();
    toastIdRef.current = toast({
        title : "Stopping server ...",
        status : "loading",
        position : "bottom-right"
    })!;
    try {
        const promise = await Offline.stop_server();
        toast.update(toastIdRef.current, {
            title : "Server Stop",
            isClosable : true,
            duration : 9000,
            description : promise,
            status : "success"
        });
        return promise;
    } catch (error) {
        toast.update(toastIdRef.current, {
            title : "Error on stop the server",
            isClosable : true,
            duration : 9000,
            description : error,
            status : "error"
        });
        throw error;
    }
}