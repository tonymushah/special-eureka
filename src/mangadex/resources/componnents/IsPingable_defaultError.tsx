import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button } from "@chakra-ui/react";
import { UseQueryResult } from "@tanstack/react-query";

export default function IsPingable_defaultError(props: {
    query: UseQueryResult<boolean, Error>
}) {
    const { query } = props;
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
                Can&apos;t ping Mangadex API
            </AlertTitle>
            <AlertDescription>
                <Box>
                    <Button
                        colorScheme={"orange"}
                        onClick={() => query.refetch()}
                        isLoading={query.isRefetching}
                    >
                        Refresh
                    </Button>
                </Box>
            </AlertDescription>
        </Alert>
    );
}