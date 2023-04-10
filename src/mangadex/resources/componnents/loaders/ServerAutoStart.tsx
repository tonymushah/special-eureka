import useServerAutoStart from "@mangadex/resources/hooks/userOptions/ServerAutoStart";
import MangaManagerState from "@mangadex/resources/hooks/MangaManagerState";
import React from "react";

/**
 * This component is used for server autostarting
 * @author tony_mushah
 */
export default function ServerAutoStartLoader(){
    const { query } = useServerAutoStart();
    const server_state = MangaManagerState();
    React.useEffect(() => {
        if(query.isSuccess && server_state.server_query.data != true){
            if(query.data == true){
                server_state.switch_server_state.mutate();
            }
        }
    }, [query.data]);
    return (
        <></>
    );
}