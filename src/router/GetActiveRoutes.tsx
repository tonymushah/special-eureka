import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import * as Chakra from "@chakra-ui/react";
import Mangadex from "@mangadex/index";
import Dashboard from "@dashboard/index";

export default function Route_Objects(props: {
    additional_routes?: RouteObject[]
}) {
    const data = [
        Mangadex,
        Dashboard
    ];
    if (props.additional_routes != undefined) {
        props.additional_routes.forEach((value) => {
            data.push(value);
        });
    }
    const router = createBrowserRouter(data , {
        
    });
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
            future={{
                "v7_startTransition" : true
            }}
        />
    );

}