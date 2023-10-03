import { Tabs, TabList, TabPanels } from "@chakra-ui/react";
import ChapterLanguages, { ChapterLanguagesTab } from "./ChapterLanguages";
import Layout_Interface, { Layout_InterfaceTab } from "./Layout_Interface";
import OfflineServer, { OfflineServerTab } from "./OfflineServer";
import UserFeedBack, { UserFeedBackTab } from "./UserFeedBack";

export default function UserOptionContent() {
    return (
        <Tabs orientation="vertical">
            <TabList>
                <ChapterLanguagesTab />
                <OfflineServerTab />
                <Layout_InterfaceTab />
                <UserFeedBackTab />
            </TabList>
            <TabPanels>
                <ChapterLanguages />
                <OfflineServer />
                <Layout_Interface />
                <UserFeedBack />
            </TabPanels>
        </Tabs>
    );
}