import React from "react";
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import * as Chakra from "@chakra-ui/react";
import Mangadex from "../mangadex";
import Dashboard from "../dashboard";

export default function Route_Objects(props: {
    additional_routes?: RouteObject[]
}) {
    let data = [
        Mangadex,
        Dashboard
    ];
    if (props.additional_routes != undefined) {
        props.additional_routes.forEach((value) => {
            data.push(value);
        })
    }
    const router = createBrowserRouter(data);
    return (
        <RouterProvider
            router={router}
            fallbackElement={
                <Chakra.Box
                    width={"100%"}
                    height={"100vh"}
                >
                    <Chakra.AbsoluteCenter>
                        <Chakra.Spinner
                            size="xl"
                            color='orange.500'
                            thickness='4px'
                        />
                    </Chakra.AbsoluteCenter>
                </Chakra.Box>
            }
        />
    )

}
