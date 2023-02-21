import { Box, Heading } from "@chakra-ui/react";
import { Container, Row } from "react-bootstrap";
import devnoteMd from "./devnotes.md";

export default function DevNotes() {
    return (
        <Container>
            <Heading color={"white"} textAlign={"center"}>DevNotes</Heading>
            <Row>
                <Box color={"white"} dangerouslySetInnerHTML={{
                    __html: devnoteMd
                }}>
                </Box>
            </Row>
        </Container>
    )
}