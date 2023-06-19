import { AbsoluteCenter, Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Stack } from "@chakra-ui/react";
import React from "react";

export default function NotFound404() {
    const location_ = location;
    const history_ = history;
    return (
        <Box
            height={"100vh"}
        >
            <AbsoluteCenter>
                <Alert
                    status="error"
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                    width={"100vh"}
                    height={"max-content"}
                >
                    <AlertIcon/>
                    <AlertTitle
                        fontSize={"25px"}
                        margin={"10px"}
                    >
                        This page is not found
                    </AlertTitle>
                    <AlertDescription>
                        <Box>
                            {
                                location_.pathname
                            }
                            <Box
                                margin={"10px"}
                            >
                                <Button
                                    colorScheme={"orange"}
                                    onClick={() => history_.back()}
                                >
                                    Go back
                                </Button>
                            </Box>
                        </Box>
                    </AlertDescription>
                </Alert>
            </AbsoluteCenter>
        </Box>
    );
}