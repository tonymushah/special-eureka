import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Outlet , Link, useOutletContext} from "react-router-dom";

type ContextType = {text : string | null}

export default function About(){
    return (
        <Box>
            <Heading>About</Heading>
            <Text>Some about...</Text>
            <Box>
              <Link to={"."}>overwiew</Link>
              &nbsp;
              <Link to="me">me</Link>
              &nbsp;
              <Link to="others">all</Link>
              &nbsp;
            </Box>
            <Box>
              <Outlet context={{ text : "lol" }}/>
            </Box>
          </Box>
    )
}

export function useText(){
    return useOutletContext<ContextType>();
}