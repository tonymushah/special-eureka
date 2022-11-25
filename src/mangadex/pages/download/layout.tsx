import React from "react";
import * as Chakra from "@chakra-ui/react"
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export default function DownloadsLaoyut(){
    return (
        <Chakra.Box>
            <Chakra.Heading>Download</Chakra.Heading>
            <Chakra.Text>A place where you manage all of your downloaded manga</Chakra.Text>
            <Chakra.Box
                as={Container}
            >
                <Outlet/>
            </Chakra.Box>
        </Chakra.Box>
    );
}