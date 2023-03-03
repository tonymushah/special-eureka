import * as Chakra from "@chakra-ui/react";
import React from 'react';
import { Outlet, RouteObject } from "react-router-dom";

const Home_Index = React.lazy(() => import("./pages"));

const projectName: string = "bilibili-comics";

export function getProjectPath() {
    return `${projectName}`
};

export function getLogo(){
    return undefined;
}

function router(): RouteObject{
    return {
        "path" : getProjectPath(),
        "element" : (
            <Chakra.Box>
                <Chakra.Heading>Welcome to {projectName}</Chakra.Heading>
                <Outlet/>
            </Chakra.Box>
        )
    }
}

export default router()