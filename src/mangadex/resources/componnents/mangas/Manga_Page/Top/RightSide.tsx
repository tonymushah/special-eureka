import * as Chakra from "@chakra-ui/react";
import "flag-icons/css/flag-icons.min.css";
import React from "react";

const Author_Artists__Comp = React.lazy(() => import("./Author_Artists__Comp"));

const Publication = React.lazy(() => import("./Publication"));

const Statis = React.lazy(() => import("./Statis"));

const Tags = React.lazy(() => import("./Tags"));

const Title = React.lazy(() => import("./Title"));

const AltTitle = React.lazy(() => import("./AltTitle"));

const ButtonGroup__ = React.lazy(() => import("../ButtonGroup__"));

function Suspense({ children }: React.PropsWithChildren) {
    return (
        <React.Suspense
            fallback={
                <Chakra.Skeleton
                    height={"20px"}
                    width={"md"}
                />
            }
        >
            {
                children
            }
        </React.Suspense>
    );
}


export default function RightSide() {
    return (
        <Chakra.Box>
            <Chakra.VStack spacing={5} alignItems={"start"}>

                <Chakra.Box display={"block"}>
                    <React.Suspense
                        fallback={
                            <Chakra.Skeleton>
                                <Chakra.Heading
                                    noOfLines={2}
                                    fontFamily={"inherit"}
                                    size={{
                                        base: "md",
                                        sm: "lg",
                                        md: "2xl",
                                        lg: "3xl"
                                    }}
                                >
                                    I&apos;m loading the title, nee-san
                                </Chakra.Heading>
                            </Chakra.Skeleton>
                        }
                    >
                        <Chakra.Heading
                            noOfLines={2}
                            fontFamily={"inherit"}
                            size={{
                                base: "md",
                                sm: "lg",
                                md: "2xl",
                                lg: "3xl"
                            }}
                        >
                            <Title />
                        </Chakra.Heading>
                    </React.Suspense>
                </Chakra.Box>
                <Chakra.Box>
                    <Suspense>
                        <Chakra.Box display={"block"}>
                            <Chakra.Heading
                                noOfLines={2}
                                fontFamily={"inherit"}
                                size={{
                                    base: "sm",
                                    sm: "md",
                                    md: "lg"
                                }}
                            >
                                <AltTitle />
                            </Chakra.Heading>
                        </Chakra.Box>
                    </Suspense>
                </Chakra.Box>
                <Chakra.Box>
                    <Suspense>
                        <Chakra.Text noOfLines={3}>
                            <Author_Artists__Comp />
                        </Chakra.Text>
                    </Suspense>
                </Chakra.Box>
                <Chakra.VStack
                    alignItems={"start"}
                    display={{
                        base: "none",
                        lg: "inherit"
                    }}
                >
                    <Chakra.Box
                        fontWeight={"bold"}
                        padding={0}
                        margin={0}
                    >
                        <Suspense>
                            <Chakra.Center
                                width={"fit-content"}
                            >
                                <Publication />
                            </Chakra.Center>
                        </Suspense>
                    </Chakra.Box>
                    <Chakra.Box>
                        <Suspense>
                            <Chakra.Box
                                noOfLines={0}
                                padding={0}
                                margin={0}
                            >
                                <Tags />
                            </Chakra.Box>
                        </Suspense>
                    </Chakra.Box>
                    <Chakra.Box>
                        <Suspense>
                            <ButtonGroup__ />
                        </Suspense>
                    </Chakra.Box>
                    <Chakra.Box>
                        <Suspense>
                            <Statis />
                        </Suspense>
                    </Chakra.Box>
                </Chakra.VStack>
            </Chakra.VStack>
        </Chakra.Box>
    );
}