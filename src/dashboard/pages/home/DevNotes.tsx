import { Box, Heading, Link, Skeleton } from "@chakra-ui/react";
import React from "react";
import { Container, Row } from "react-bootstrap";
import DevnoteMdx from "./devnotes.mdx";

const ExtLink = React.lazy(async () => {
    const res = await import("@commons-res/components/ExtLink");
    return {
        default: res.ExtLink
    };
});

export default function DevNotes() {
    return (
        <Container>
            <Heading color={"white"} textAlign={"center"}>DevNotes</Heading>
            <Row>
                <Box
                    color={"whiteAlpha.900"}
                >
                <DevnoteMdx
                    components={
                        {
                            a(node) {
                                if(node.href?.startsWith("#")){
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
                            }
                        }
                    }
                /></Box>
            </Row>
        </Container>
    );
}