import React from "react";
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import * as Chakra from "@chakra-ui/react";
import { useQuery } from "react-query";
import ErrorEL1 from "../mangadex/resources/componnents/error/ErrorEL1";

type Special_Eureka_Route = {
    name: string,
    router: string
}

export async function get_route_objects(): Promise<RouteObject[]> {
    let routes = await import("../routes.json");
    let to_use: Array<Special_Eureka_Route> = routes.data;
    let router: Array<RouteObject> = [];
    for (let index = 0; index < to_use.length; index++) {
        const element = to_use[index];
        const getted: {
            default: RouteObject
        } = await import(element.router);
        router.push(getted.default);
    }
    return router;
}

export default function Route_Objects(props: {
    additional_routes?: RouteObject[]
}) {
    const queryKey = "special-eureka-routes";
    const query = useQuery<RouteObject[], Error>(queryKey, () => {
        return get_route_objects();
    },{
        staleTime: Infinity
    })
    if (query.isSuccess) {
        let data = query.data;
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
    if (query.isError) {
        return (
            <ErrorEL1
                error={query.error}
            />
        )
    }
    return (
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
    )
}
