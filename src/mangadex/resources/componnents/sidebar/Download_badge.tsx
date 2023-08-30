import MangaManagerState from "../../hooks/MangaManagerState";
import * as Chakra from "@chakra-ui/react";
function Badge() {
    const server_state = MangaManagerState();
    if (server_state.server_query.fetchStatus == "fetching" || server_state.switch_server_state.status == "loading") {
        return (
            <Chakra.Badge cursor={"wait"} bg='blue.500'>Loading</Chakra.Badge>
        );
    }
    if (server_state.server_query.data == true) {
        return (
            <Chakra.Badge cursor={"pointer"} bg='green.500'>ON</Chakra.Badge>
        );
    } else {
        return (
            <Chakra.Badge bg='red.500'>OFF</Chakra.Badge>
        );
    }
}
export default function Downloads_badge_() {
    const server_state = MangaManagerState();

    return (
        <Chakra.Box onClick={() => {
            if (server_state.server_query.fetchStatus != "fetching" && server_state.switch_server_state.status != "loading") {
                server_state.switch_server_state.mutate();
            }
        }}>
            <Badge />
        </Chakra.Box>
    );
}
