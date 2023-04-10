import { checkUpdate, installUpdate, UpdateResult } from "@tauri-apps/api/updater";
import { useQuery } from "@tanstack/react-query";
import { useDashboardToast } from "./DashBoardToasts";


export function TauriCheckUpdateQuery(props : {
    withoutToast?: boolean
}){
    const { addToast } = useDashboardToast();

    const queryKey = ["special-eureka", "updater"];
    const updater_query = useQuery<UpdateResult, string>(queryKey, () => {
        return new Promise<UpdateResult>((resolve) => {
            checkUpdate().then((value) => {
                console.log(value);
                resolve(value);
            }).catch((reason) => {
                console.error(reason);
                resolve({
                    "shouldUpdate" : false
                });
            });
        });
    }, {
        staleTime : Infinity,
        onSuccess(data) {
            if(data.shouldUpdate == false){
                if(props.withoutToast != true){
                    addToast({
                        status : "success",
                        title : "No update required",
                        isClosable : true
                    });
                }
                
            }else{
                if(props.withoutToast != true){
                    addToast({
                        status : "success",
                        title : "Update Available",
                        isClosable : true,
                        description : (<></>)
                    });
                }
            }
        },
        onError(err) {
            addToast({
                status : "error",
                title : "Error on checking for updates",
                isClosable : true,
                description : err
            });
        }
    });
    return {
        queryKey,
        query: updater_query
    };
}

export function useTauriInstallUpdate(props: {
    withoutToast?: boolean,
    notify?: boolean
}){
    const { addToast , updateToast } = useDashboardToast();
    const queryKey = ["special-eureka", "update", "install"];
    const query = useQuery(queryKey, async () => {
        addToast({
            "title" : "Installing the update",
            "description" : "You can do something else but don't close the application",
            "status" : "loading"
        });
        return await installUpdate();
    }, {
        staleTime: Infinity,
        enabled: false,
        retry(failureCount) {
            return failureCount >= 1;
        },
        onSuccess() {
            if(props.withoutToast == true){
                updateToast({
                    "title" : "Update downloaded",
                    "description" : "The update will be seen after an app reload",
                    duration: 9000,
                    isClosable: true,
                    status: "success"
                });
            }
        },
        onError(err) {
            if(props.withoutToast == true){
                if(err instanceof Error){
                    updateToast({
                        title: err.name,
                        description: err.message,
                        duration: 9000,
                        isClosable: true,
                        status: "error"
                    });
                }else{
                    updateToast({
                        title: "Update Error",
                        description: JSON.stringify(err),
                        duration: 9000,
                        isClosable: true,
                        status: "error"
                    });
                }
            }
        },
    });
    return {
        queryKey,
        query
    };
}