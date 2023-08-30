import * as Chakra from "@chakra-ui/react";
import TryCatch from "@commons-res/components/TryCatch";
import { Leader_query_for_GroupPage } from "./Leader_query_for_GroupPage";

function OnCatch() {
    return (
        <Chakra.Heading fontSize={"lg"} fontFamily={"inherit"}>Leader : None</Chakra.Heading>
    );
}

export default function OnSuccess() {
    return (
        <TryCatch
            catch={OnCatch}
        >
            <Leader_query_for_GroupPage />
        </TryCatch>
    );
}
