import * as Chakra from "@chakra-ui/react";
import "@commons-res/flag-icons/less/flag-icons.less";
import React from "react";
import ChakraContainer from "../../../layout/Container";
import Image from "./Image";
import Layout from "./Layout";
import RightSide from "./RightSide";

const TopButtom = React.lazy(() => import("./TopBottom"));

export default function Top() {
    return (
        <Layout>
            <ChakraContainer>
                <Chakra.Grid templateColumns={"repeat(12, 1fr)"} gap={5}>
                    <Chakra.GridItem colSpan={3}>
                        <Image />
                    </Chakra.GridItem>
                    <Chakra.GridItem colSpan={9}>
                        <RightSide />
                    </Chakra.GridItem>
                </Chakra.Grid>
                <React.Suspense>
                    <TopButtom />
                </React.Suspense>
            </ChakraContainer>
        </Layout>
    );
}