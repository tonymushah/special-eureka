import React from "react";
import DeskApiRequest from "../../../api/offline/DeskApiRequest";
import * as Chakra from "@chakra-ui/react";

const Launch_server = React.lazy(() => import("./Launch_server"));
const Stop_server = React.lazy(() => import("./Stop_server"));

export default function Downloads_badge_old() {
    const [loader, setLoader] = React.useState<React.ReactNode>(<></>);

    const [internal_serverStatus, setServ] = React.useState<boolean>();

    DeskApiRequest.ping().then(setServ).catch(() => {

    });

    function refresh() {
        DeskApiRequest.ping().then(setServ).catch(setServ);
    }

    return (
        <Chakra.Box onClick={() => {
            if (internal_serverStatus == false) {
                setLoader(
                    <React.Suspense>
                        <Launch_server callAfter={refresh} />
                    </React.Suspense>
                )
            } else {
                setLoader(
                    <React.Suspense>
                        <Stop_server callAfter={refresh} />
                    </React.Suspense>
                )
            }
        }}>
            {
                internal_serverStatus ? (
                    <Chakra.Badge bg='green.500'>ON</Chakra.Badge>
                ) : (
                    <Chakra.Badge bg='red.500'>OFF</Chakra.Badge>
                )
            }
            {
                loader
            }
        </Chakra.Box>
    )
}