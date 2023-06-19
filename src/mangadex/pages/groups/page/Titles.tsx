import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Stack, TabPanel, Text } from "@chakra-ui/react";
import { useGroupRouteOutletContext } from ".";
import TryCatch from "@commons-res/components/TryCatch";
import { Group_Page_Suspense } from "@mangadex/resources/componnents/groups/Group_Page";
import React from "react";

const Group_Titles = React.lazy(() => import("@mangadex/resources/componnents/groups/Group_Titles"));

export default function Group_Titles_Page() {
    const { group } = useGroupRouteOutletContext();
    return (
        <TabPanel>
            <TryCatch
                catch={(error) => (
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
                )}
            >
                <Group_Page_Suspense>
                    <Group_Titles id={group.get_id()} />
                </Group_Page_Suspense>
            </TryCatch>
        </TabPanel>
    );
}