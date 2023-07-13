import { Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import CttRtgComp from "./CttRtgComp";
import StatusComp from "./StatusCom";
import TagsComp from "./TagsComp";

export default function FilterCollapse() {
    return (
        <React.Fragment>
            <Wrap spacing={"25px"}>
                <WrapItem>
                    <CttRtgComp />
                </WrapItem>
                <WrapItem>
                    <StatusComp />
                </WrapItem>
            </Wrap>
            <TagsComp />
        </React.Fragment>
    );
}