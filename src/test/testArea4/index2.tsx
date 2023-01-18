import React from "react"
import ReactDOM from 'react-dom/client';
import DeskApiRequest from "../../mangadex/api/offline/DeskApiRequest";
import ReactJson from 'react-json-view';
import { getClient, Response } from "@tauri-apps/api/http";
import { launch_server } from "../../mangadex/api/offline/plugin";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { Manga_with_allRelationship } from "../../mangadex/api/structures/Manga";
import { Button, ChakraProvider, ToastId, useToast, UseToastOptions } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { checkUpdate, UpdateResult } from "@tauri-apps/api/updater";

const root = ReactDOM.createRoot(document.getElementById("root")!);

const client = new QueryClient();

function Tauri_Updater(){
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

    const updater_query = useQuery<UpdateResult, string>("special-eureka-updater",() => {
        return new Promise<UpdateResult>((resolve, reject) => {
            checkUpdate().then((value) => {
                resolve(value);
            }).catch((reason) => {
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
    });
    return (
        <Button
            colorScheme={"facebook"}
            isLoading={updater_query.isLoading}
            onClick={() => {
                updater_query.refetch()
            }}
        >
            Check for updates
        </Button>
    )
}



root.render(
    <ChakraProvider>
        <QueryClientProvider client={client}>
            <ReactQueryDevtools
                position={"bottom-right"}
            />
            <Tauri_Updater/>
        </QueryClientProvider>
    </ChakraProvider>
)
