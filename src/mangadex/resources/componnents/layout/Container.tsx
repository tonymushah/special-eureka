import { Container, ContainerProps } from "@chakra-ui/react";

export default function ChakraContainer(props: ContainerProps) {
    return (
        <Container
            maxWidth={{
                sm: "container.sm",
                md: "container.md",
                lg: "container.lg",
                xl: "container.xl"
            }}
            {...props}
        >
            {
                props.children
            }
        </Container>
    );
}