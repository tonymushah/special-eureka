import * as Chakra from "@chakra-ui/react";
import BackButton from "@mangadex/resources/componnents/router/BackButton";
import { Outlet } from "react-router-dom";

export default function DownloadsLaoyut(){
    return (
        <Chakra.Box>
            <Chakra.Box margin={5}>
                <Chakra.HStack>
                    <BackButton/>
                    <Chakra.Heading fontFamily={"inherit"}>Download</Chakra.Heading>
                </Chakra.HStack>
                <Chakra.Text>A place where you manage all of your downloaded manga</Chakra.Text>
            </Chakra.Box>
            <Chakra.Box>
                <Outlet/>
            </Chakra.Box>
        </Chakra.Box>
    );
}