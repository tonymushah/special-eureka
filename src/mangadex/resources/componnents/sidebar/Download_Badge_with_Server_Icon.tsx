import MangaManagerState from "../../hooks/MangaManagerState";
import * as Chakra from "@chakra-ui/react";
import { FiServer } from "react-icons/fi";

export default function Downloads_badge_With_Server_Icon() {
    const server_state = MangaManagerState();
    if (server_state.server_query.fetchStatus == "fetching" || server_state.switch_server_state.status == "loading") {
        return (
            <Chakra.Icon
                as={FiServer}
                color={"blue.500"}
                cursor={"wait"}
                fontSize={"20px"}
            />
        );
    }
    return (
        <Chakra.Icon
            as={FiServer}
            fontSize={"20px"}
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
