import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Stack, Text } from "@chakra-ui/react";
import TryCatch, { useCatch } from "@commons-res/components/TryCatch";
import { Group_Page_Suspense } from "@mangadex/resources/componnents/groups/Group_Page/Group_Page_Suspense";
import React from "react";
import { useGroupRouteOutletContext } from ".";

const Group_Titles = React.lazy(() => import("@mangadex/resources/componnents/groups/Group_Titles"));

function Error_() {
    const error = useCatch();
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
            <AlertTitle>
                {
                    error.name
                }
            </AlertTitle>
            <AlertDescription>
                <Stack
                >
                    <Text>{
                        error.message
                    }</Text>
                    <Box>
                        {
                            error.stack
                        }
                    </Box>
                </Stack>
            </AlertDescription>
        </Alert>
    );
}

export default function Group_Titles_Page() {
    const { group } = useGroupRouteOutletContext();
    return (
        <TryCatch
            catch={<Error_/>}
        >
            <Group_Page_Suspense>
                <Group_Titles id={group.get_id()} />
            </Group_Page_Suspense>
        </TryCatch>
    );
}