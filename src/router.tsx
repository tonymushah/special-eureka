import React from "react";
import Index_Page from "./index_page";
import { Await, createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import * as Chakra from "@chakra-ui/react";
import { invoke } from "@tauri-apps/api/tauri";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Mangadex from "./mangadex/index";

function Close_splashscreen() {
    return (
        <React.Suspense>
            <Await
                resolve={invoke("close_splashscreen")}
            >
            </Await>
        </React.Suspense>
    );
}

export default function Router() {

    const { isOpen, onOpen, onClose } = Chakra.useDisclosure();

    const All_Routes: RouteObject = {
        "path": "/",
        "element": <Index_Page />,
    }

    const RouterList = [
        "./mangadex/index"
    ]
    const router = createBrowserRouter(
        [
            All_Routes,
            Mangadex
        ]
    )
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools
                position={"bottom-right"}
                initialIsOpen={false}
            />
            <RouterProvider
                router={router}
                fallbackElement={
                    <Chakra.AbsoluteCenter>
                        <Chakra.Spinner
                            size="xl"
                            color='orange.500'
                            thickness='4px'
                        />
                    </Chakra.AbsoluteCenter>
                }
            />
            <Close_splashscreen />
        </QueryClientProvider>
    )
}
