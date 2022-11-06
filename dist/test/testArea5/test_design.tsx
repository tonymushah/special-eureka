import React from "react";
import ReactDOM from "react-dom/client";
import * as Chakra from "@chakra-ui/react"
import { Cover_Image_ } from "./Image_";
import { Col, Container, Row } from "react-bootstrap";
const test_area = ReactDOM.createRoot(document.getElementById("test_area")!);

/*var arrays : Array<Chapter> | Response<any> = await array![0].getFeed(
    offset_limits_1,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    new Order(
        undefined,
        Asc_Desc.desc()
    )
)*/
"center -20em"
test_area.render(
    <Chakra.ChakraProvider>
        <Chakra.Box>
            <Chakra.Box
                backgroundImage={"./imgs/cover_image1.jpg"}
                backgroundRepeat={"no-repeat"}
                backgroundPosition={{
                    sm: "0px -5em",
                    md: "center -10em",
                    lg: "center -20em",
                    xl: "center -20em",
                    '2xl': "center -20em",
                }}
                backgroundSize={"cover"}
            >
                <Chakra.Box
                    backdropFilter={"auto"}
                    backdropBlur={"10px"}
                    bgGradient="linear(#FFF 75%)"
                    paddingTop={"10px"}
                >
                    <Container>
                        <Row>
                            <Col xs="3" lg="3">
                                <Cover_Image_ src={"./imgs/cover_image1.jpg"}/>
                            </Col>
                            <Col xs="9" lg="9" className="overflow-hidden">
                                <Chakra.Heading
                                    size={{
                                        base: "lg",
                                        sm: "xl",
                                        md: "2xl",
                                        xl: "3xl"
                                    }}
                                    noOfLines={1}
                                    marginBottom={{
                                        md : "1vh",
                                        lg : "1em"
                                    }}
                                >
                                    Manga title
                                </Chakra.Heading>
                                <Chakra.Heading
                                    size={{
                                        base: "sm",
                                        md: "lg"
                                    }}
                                    noOfLines={1}    
                                    marginBottom={{
                                        md : "1em"
                                    }}
                                >
                                    Alt Title
                                </Chakra.Heading>
                                <Chakra.Box
                                    backgroundColor={"white"}
                                    height={"full"}
                                    borderTopRadius={"10px"}
                                    boxShadow={"md"}
                                >
                                    <Chakra.Box
                                        marginLeft={"20px"}
                                        marginTop={"1vh"}
                                        
                                    >
                                        <Chakra.Heading
                                            paddingTop={"10px"}
                                            size={{
                                                base: "xs",
                                                lg: "md"
                                            }}
                                        >
                                            Author or Artists
                                        </Chakra.Heading>
                                        <Chakra.Box>sdadas</Chakra.Box>
                                    </Chakra.Box>
                                </Chakra.Box>
                            </Col>
                        </Row>
                    </Container>
                </Chakra.Box>
            </Chakra.Box>
            <Chakra.Box>
                <Chakra.Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam quam, doloribus, sunt sit nobis saepe error, quo commodi ex sint totam quod cum quisquam molestiae aperiam reiciendis laudantium sed eaque.
                </Chakra.Text>
            </Chakra.Box>
        </Chakra.Box>
    </Chakra.ChakraProvider>
)