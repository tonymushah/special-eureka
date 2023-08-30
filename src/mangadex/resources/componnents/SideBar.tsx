import * as Chakra from "@chakra-ui/react";
import React from "react";
import MyErrorBounderies from "./error/MyErrorBounderies";
import useRTLSidebar from "../hooks/userOptions/RtlSidebar";
import { Mangadex_suspense__ } from "@mangadex/index";
import MangadexSpinner from "./kuru_kuru/MangadexSpinner";

const Side_bar = React.lazy(() => import("./sidebar/SideBar"));

const SideBar = React.forwardRef(function TheSidebar () {
    return (
        <React.Suspense
            fallback={<Chakra.Box
                width={"80px"}
                height={"100vh"}
            >
                <Chakra.Center>
                    <MangadexSpinner />
                </Chakra.Center>
            </Chakra.Box>}
        >
            <Side_bar />
        </React.Suspense>
    );
});

function LTRSideBar() {
    const { query } = useRTLSidebar();
    if (query.data != true) {
        return (
            <SideBar />
        );
    } else {
        return (<React.Fragment />);
    }
}

function RTLSidebar(){
    const { query } = useRTLSidebar();
    if(query.data == true){
        return (<SideBar/>);
    }else{
        return (<React.Fragment/>);
    }
}

export default function Content(props: React.PropsWithChildren) {
    const { query } = useRTLSidebar();
    if (query.isLoading) {
        return (
            <Mangadex_suspense__ />
        );
    }
    return (
        <Chakra.Box width={"100% !important"} display={"inline-flex"}>
            <LTRSideBar />
            <Chakra.Box
                width={"100%"}
                height={"100vh"}
                scrollBehavior={"smooth"}
                overflowY={"scroll"}
            >
                <Chakra.Box id="top-content">
                    <Chakra.Box id="content" >
                        <MyErrorBounderies>
                            {props.children}
                        </MyErrorBounderies>
                    </Chakra.Box>
                </Chakra.Box>
            </Chakra.Box>
            <RTLSidebar/>
        </Chakra.Box>
    );
}

