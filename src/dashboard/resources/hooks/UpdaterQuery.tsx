import { ToastId, useToast, UseToastOptions } from "@chakra-ui/react";
import { checkUpdate, UpdateResult } from "@tauri-apps/api/updater";
import React from "react";
import { useQuery } from "react-query";


export function TauriCheckUpdateQuery(){
    const toast_ref = React.useRef<ToastId>();
    const toast = useToast({
        "position" : "bottom-right",
        "isClosable" : false,
        "duration" : 9000
    });
    
    function addToast(props? : UseToastOptions){
        toast_ref.current = toast(props)
    }
    
    function updateToast(props : UseToastOptions){
        if(toast_ref.current !== undefined){
            toast.update(toast_ref.current, props);
        }else{
            addToast(props);
        }
    }

    const queryKey = "special-eureka-updater";
    const updater_query = useQuery<UpdateResult, string>(queryKey, () => {
        return new Promise<UpdateResult>((resolve, reject) => {
            checkUpdate().then((value) => {
                console.log(value);
                resolve(value);
            }).catch((reason) => {
                console.error(reason);
                resolve({
                    "shouldUpdate" : false
                })
            })
        });
    }, {
        staleTime : Infinity,
        onSuccess(data) {
            if(data.shouldUpdate == false){
                addToast({
                    status : "success",
                    title : "No update required",
                    isClosable : true
                })
            }else{
                addToast({
                    status : "success",
                    title : "Update Available",
                    isClosable : true,
                    description : (<></>)
                })
            }
        },
        onError(err) {
            addToast({
                status : "error",
                title : "Error on checking for updates",
                isClosable : true,
                description : err
            })
        },
        enabled: false
    });
    return {
        queryKey,
        query: updater_query
    }
}