import React from "react";
import Index_Page from "./index_page";
import { Await, createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import * as Chakra from "@chakra-ui/react";
import ReactHotkeys from "react-hot-keys";

import useMangadexRouter, { useMangadexEvent } from "./mangadex/index";
import { invoke } from "@tauri-apps/api/tauri";

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
        "element": <Index_Page/>,
    }

    const Mangadex = useMangadexRouter();

    const [isToggled, unlistenAll] = useMangadexEvent();

    const router = createBrowserRouter(
        [
            All_Routes,
            Mangadex
        ]
    )

    return (
        <>
            <ReactHotkeys
                keyName="ctrl+p"
                onKeyDown={onOpen}
            >
                <Chakra.Modal
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <Chakra.ModalOverlay/>
                    <Chakra.ModalContent>
                        <Chakra.ModalHeader>Mangadex Desktop Router Settings</Chakra.ModalHeader>
                        <Chakra.ModalCloseButton/>
                        <Chakra.ModalBody>
                            <Chakra.Box>
                                <Chakra.Text
                                    size={"md"}
                                >
                                    Mangadex Event Display
                                    &nbsp;
                                    &nbsp;
                                    <Chakra.Switch
                                        isChecked={isToggled}
                                        onChange={(event) => unlistenAll()}
                                    />
                                </Chakra.Text>
                            </Chakra.Box>
                        </Chakra.ModalBody>
                    </Chakra.ModalContent>
                </Chakra.Modal>
            </ReactHotkeys>
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
            <Close_splashscreen/>
        </>
    )
}
