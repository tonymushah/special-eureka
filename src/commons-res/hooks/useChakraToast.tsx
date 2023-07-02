import { ToastId, UseToastOptions, useToast } from "@chakra-ui/react";
import React from "react";

export type ChakraToast = (options: UseToastOptions) => void

export function useChakraToast(options?: UseToastOptions): ChakraToast{
    const toast = useToast(options);
    const toastIdRef = React.useRef<ToastId | undefined>(options?.id);
    return (options_: UseToastOptions) => {
        if(options_.id == undefined) options_.id = options?.id;
        if(toastIdRef.current == undefined) {
            toastIdRef.current = toast(options_);
        }else if(toast.isActive(toastIdRef.current)){
            toast.update(toastIdRef.current, options_);
        }else{
            toastIdRef.current = toast(options_);
        }
    };
}