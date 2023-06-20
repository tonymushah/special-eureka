import { Container } from "@chakra-ui/react";
import React from "react";

export default function ChakraContainer(props: React.PropsWithChildren) {
    return (
        <Container
            maxWidth={{
                sm: "container.sm",
                md: "container.md",
                lg: "container.lg",
                xl: "container.xl"
            }}
            margin={2}
        >
            {
                props.children
            }
        </Container>
    );
}