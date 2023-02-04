import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button } from "@chakra-ui/react"
import React from "react"
import { UseQueryResult } from "react-query"

export default function IsPingable_defaultError(props: {
    query: UseQueryResult<boolean, Error>
}) {
    const { query } = props
    return (
        <Alert
            status="error"
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height={"max-content"}
        >
            <AlertIcon />
            <AlertTitle
            >
                Can't ping Mangadex API
            </AlertTitle>
            <AlertDescription>
                <Box>
                    <Button
                        colorScheme={"orange"}
                        onClick={() => query.refetch()}
                    >
                        Refresh
                    </Button>
                </Box>
            </AlertDescription>
        </Alert>
    )
}