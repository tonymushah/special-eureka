import MangaManagerState from "../../hooks/MangaManagerState";
import * as Chakra from "@chakra-ui/react";
import { FaServer } from "react-icons/fa";

export default function Downloads_badge_With_Server_Icon() {
    const server_state = MangaManagerState();
    if (server_state.server_query.fetchStatus == "fetching" || server_state.switch_server_state.status == "loading") {
        return (
            <Chakra.Icon
                as={FaServer}
                color={"blue.500"}
                cursor={"wait"}
            />
        );
    }
    return (
        <Chakra.Icon
            as={FaServer}
            onClick={() => {
                server_state.switch_server_state.mutate();
            }}
            color={server_state.server_query.data == true ? (
                "green.500"
            ) : (
                "red.500"
            )
            }
        />
    );
}
