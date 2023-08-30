import { useServerStateQuery } from "./useServerStateQuery";
import { useServerStateMutation } from "./useServerStateMutation";

export default function MangaManagerState(){
    const { key, query } = useServerStateQuery();
    const switch_server_state = useServerStateMutation(key, query);
    return {
        server_query : query,
        switch_server_state: switch_server_state
    };
}
