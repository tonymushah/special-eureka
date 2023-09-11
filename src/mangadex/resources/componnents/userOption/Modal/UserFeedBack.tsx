import * as Chakra from "@chakra-ui/react";
import React from "react";
import { FiMessageSquare } from "react-icons/fi";

const UserFeedBackBox = React.lazy(() => import("@mangadex/resources/componnents/user/feedback/box"));

export function UserFeedBackTab() {
    return (
        <Chakra.Tab>
            <Chakra.HStack>
                <Chakra.Icon as={FiMessageSquare} />
                <Chakra.Text as={"span"}>
                    User FeedBack
                </Chakra.Text>
            </Chakra.HStack>
        </Chakra.Tab>
    );
}

export default function UserFeedBack() {
    return (
        <Chakra.TabPanel>
            <React.Suspense
                fallback={<Chakra.Tag>Loading...</Chakra.Tag>}
            >
                <UserFeedBackBox />
            </React.Suspense>
        </Chakra.TabPanel>
    );
}