import * as Chakra from "@chakra-ui/react";
import React from "react";
import MyErrorBounderies from "./error/MyErrorBounderies";

import mangadex_logo from "@mangadex/resources/ico/ddb5721c5458b5edc9d6782a5f107119.svg";

const Side_bar = React.lazy(() => import("./sidebar/SideBar"));

export default function Content(props: React.PropsWithChildren) {
    return (

        <div className='w-100 d-inline-flex'>
            <React.Suspense
                fallback={
                    <Chakra.Box
                        width={"80px"}
                        height={"100vh"}
                    >
                        <Chakra.Center>
                            <Chakra.Spinner />
                        </Chakra.Center>
                    </Chakra.Box>
                }
            >
                <Side_bar />
            </React.Suspense>

            <Chakra.Box
                width={"100%"}
                height={"100vh"}
                scrollBehavior={"smooth"}
                overflowY={"scroll"}
            >
                <Chakra.Box id="top-content">
                    <Chakra.Box id="content">
                        <MyErrorBounderies>
                            {props.children}
                        </MyErrorBounderies>
                    </Chakra.Box>
                </Chakra.Box>
            </Chakra.Box>
        </div>
    );
}

