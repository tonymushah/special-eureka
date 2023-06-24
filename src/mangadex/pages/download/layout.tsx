import React from "react";
import * as Chakra from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function DownloadsLaoyut(){
    return (
        <Chakra.Box>
            <Chakra.Heading fontFamily={"inherit"}>Download</Chakra.Heading>
            <Chakra.Text>A place where you manage all of your downloaded manga</Chakra.Text>
            <Chakra.Box>
                <Outlet/>
            </Chakra.Box>
        </Chakra.Box>
    );
}