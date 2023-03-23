import { Box, Center, Heading, Kbd, Text, Wrap, WrapItem } from "@chakra-ui/react";
import Website_Componnent from "../../resources/components/Website_Componnents";
import { Container, Row } from "react-bootstrap";
import websites from "../../../websites";

export default function CurrentlySupportedWebsites() {
    return (
        <Container>
            <Row>
                <Box textAlign={"center"}>
                    <Heading color={"white"}>Currently Supported Websites</Heading>
                    <Text textColor={"white"}>You can use <Kbd textColor={"black"}>ctrl</Kbd> + <Kbd textColor={"black"}>k</Kbd> to navigate beetween website safely</Text>
                </Box>
            </Row>
        <Wrap spacing={"10px"}>
            {
                websites.map((value) => (
                    <WrapItem key={value.name}>
                        <Website_Componnent
                            to_use={value}
                        />
                    </WrapItem>
                ))
            }
        </Wrap>
        </Container>
    )
}