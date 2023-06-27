import { Box, Container, Heading, Link, Skeleton } from "@chakra-ui/react";
import React from "react";
import DevnoteMdx from "./devnotes.mdx";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";

const ExtLink = React.lazy(async () => {
    const res = await import("@commons-res/components/ExtLink");
    return {
        default: res.ExtLink
    };
});

export default function DevNotes() {
    return (
        <ChakraContainer>
            <Heading color={"white"} textAlign={"center"}>DevNotes</Heading>
            <Box>
                <Box
                    marginLeft={9}
                    marginRight={9}
                    color={"whiteAlpha.900"}
                >
                    <DevnoteMdx
                        components={
                            {
                                a(node) {
                                    if (node.href?.startsWith("#")) {
                                        return (
                                            <Link
                                                href={node.href}
                                                _hover={{
                                                    "color": "gray.900"
                                                }}>{node.children}</Link>
                                        );
                                    }
                                    return (
                                        <React.Suspense
                                            fallback={<Skeleton width={"10px"} height={"10px"} />}
                                        >
                                            {
                                                node.href == undefined ? (
                                                    <Link _hover={{
                                                        "color": "gray.900"
                                                    }}>{node.children}</Link>
                                                ) : (
                                                    <ExtLink href={node.href}>
                                                        <Link _hover={{
                                                            "color": "gray.900"
                                                        }}>{node.children}</Link>
                                                    </ExtLink>
                                                )
                                            }
                                        </React.Suspense>
                                    );
                                },
                                h1(node) {
                                    return (
                                        <Heading size={"lg"}>{node.children}</Heading>
                                    );
                                }
                            }
                        }
                    />
                </Box>
            </Box>
        </ChakraContainer>
    );
}