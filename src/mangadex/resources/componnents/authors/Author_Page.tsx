import * as Chakra from "@chakra-ui/react";
import React from "react";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import { Author } from "@mangadex/api/structures/Author";
import waveHaikei_ from "./imgs/wave-haikei-1.svg";
import waveHaikeiDark_ from "./imgs/wave-haikei.svg";
import { useTrackEvent } from "@mangadex/index";
import { appWindow } from "@tauri-apps/api/window";

const Author_Page_Biography = React.lazy(() => import("./Author_Page_Biography"));
const Author_Page_Socials = React.lazy(() => import("./Author_Page_Socials"));
const Author_works = React.lazy(() => import("./Author_works"));

function Author_Where_ToFind(props: {
    src: Author
}) {
    if (props.src.has_socials()) {
        return (
            <React.Fragment>
                <Chakra.Heading size={"md"} fontFamily={"inherit"}>
                    Where to find
                </Chakra.Heading>
                <Chakra.Box>
                    <Author_Page_Suspense>
                        <Author_Page_Socials
                            src={props.src}
                        />
                    </Author_Page_Suspense>
                </Chakra.Box>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment />
        );
    }

}

function Author_Page_Suspense(props: React.PropsWithChildren) {
    return (
        <React.Suspense
            fallback={
                <Chakra.Box width={"100%"}>
                    <Chakra.Skeleton width={"100%"} height={"15px"} />
                </Chakra.Box>
            }
        >
            {
                props.children
            }
        </React.Suspense>
    );
}

export default function Author_Page(props: {
    src: Author
}) {
    useTrackEvent("mangadex-author-entrance", {
        type: "author",
        id: props.src.get_id()
    });
    React.useEffect(() => {
        appWindow.setTitle(`${props.src.get_Name()} | Mangadex`);
    }, []);
    const backgroundColor = Chakra.useColorModeValue("#e2e8f0", "#4A5568");
    const waveHaikei = Chakra.useColorModeValue(waveHaikei_, waveHaikeiDark_);
    return (
        <Chakra.Box>
            <Chakra.Box
                width={"100%"}
                backgroundPosition={"bottom"}
                backgroundImage={waveHaikei}
                backgroundRepeat={"no-repeat"}
                backgroundSize={"cover"}
            >
                <Chakra.Heading fontFamily={"inherit"} paddingTop={"5em"} marginLeft={"2em"} size={"2xl"} marginBottom={"0px"}>{props.src.get_Name()}</Chakra.Heading>
            </Chakra.Box>
            <Chakra.Box
                marginTop={"0px"}
                backgroundColor={backgroundColor}
            >
                <Chakra.Box paddingTop={"25px"} as={ChakraContainer}>
                    <Chakra.Box>
                        {
                            props.src.get_biography() == undefined ? (
                                <React.Fragment />
                            ) : (
                                <Author_Page_Suspense>
                                    <Chakra.Heading size={"md"} fontFamily={"inherit"}>
                                        Biography
                                    </Chakra.Heading>
                                    <Author_Page_Biography
                                        src={props.src}
                                    />
                                </Author_Page_Suspense>
                            )
                        }
                    </Chakra.Box>
                    <Chakra.Box>
                        <Author_Where_ToFind src={props.src} />
                        <Chakra.Box>
                            <Author_Page_Suspense>
                                <Author_works
                                    {...props}
                                />
                            </Author_Page_Suspense>
                        </Chakra.Box>
                    </Chakra.Box>
                </Chakra.Box>
            </Chakra.Box>
        </Chakra.Box>
    );
}
