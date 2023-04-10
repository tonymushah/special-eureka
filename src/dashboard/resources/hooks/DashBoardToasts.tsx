import { ToastId, useToast, UseToastOptions } from "@chakra-ui/react";
import React from "react";

export function useDashboardToast(){
    const toast_ref = React.useRef<ToastId>();
    const toast = useToast({
        "position" : "bottom-right",
        "isClosable" : false,
        "duration" : 9000
    });
    function addToast(props? : UseToastOptions){
        toast_ref.current = toast(props);
    }
    function updateToast(props : UseToastOptions){
        if(toast_ref.current !== undefined){
            toast.update(toast_ref.current, props);
        }else{
            addToast(props);
        }
    }
    return {
        addToast, 
        updateToast
    };
}