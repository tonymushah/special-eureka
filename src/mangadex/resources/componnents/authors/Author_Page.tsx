import * as Chakra from "@chakra-ui/react";
import React from "react";

import { Container } from "react-bootstrap";
import { Author } from "../../../api/structures/Author";
import waveHaikei from "./imgs/wave-haikei-1.svg";

const Author_Page_Biography = React.lazy(() => import("./Author_Page_Biography"));
const Author_Page_Socials = React.lazy(() => import("./Author_Page_Socials"));
const Author_works = React.lazy(() => import("./Author_works"));

function Author_Page_Suspense(props: React.PropsWithChildren){
    return (
        <React.Suspense
            fallback={
                <Chakra.Box width={"100%"}>
                    <Chakra.Skeleton width={"100%"} height={"15px"}/>
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
                backgroundColor={"#e2e8f0"}
            >
                <Chakra.Box paddingTop={"25px"} as={Container}>
                    <Chakra.Box>
                        <Chakra.Heading size={"md"} fontFamily={"inherit"}>
                            Biography
                        </Chakra.Heading>
                        <Chakra.Box
                        >
                            {
                                props.src.get_biography() == undefined ? (
                                    <Chakra.Text as='i'>No Biography</Chakra.Text>
                                ) : (
                                    <Author_Page_Suspense>
                                        <Author_Page_Biography
                                        src={props.src}
                                    />
                                    </Author_Page_Suspense>
                                )
                            }
                        </Chakra.Box>
                    </Chakra.Box>
                    <Chakra.Box>
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
