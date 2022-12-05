import React from "react";
import * as Chakra from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Dashboard(){
    return (
    <ol>
        <li><Chakra.Link as={Link} to="/mangadex/">To Mangadex</Chakra.Link></li>
        <li><Chakra.Link href="./test/testArea1/index.html">test area1</Chakra.Link></li>
        <li><Chakra.Link href="./test/testArea2/">test area2</Chakra.Link></li>
        <li><Chakra.Link href="./test/testArea3/index.html">test area3</Chakra.Link></li>
        <li><Chakra.Link href="./test/testArea4/index.html">test area4</Chakra.Link></li>
        <li><Chakra.Link href="./test/testArea5/index.html">test area5</Chakra.Link></li>
    </ol>
    );
}