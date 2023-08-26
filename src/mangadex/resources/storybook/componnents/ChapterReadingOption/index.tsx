import { HStack } from "@chakra-ui/react";
import { ChapterPage_outlet_context } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";
import PageSelection from "./PageSelection";
import RtlSwitch from "./RtlMode";

export default function ChapterReadingOption({ data } : {
    data : ChapterPage_outlet_context
}){
    return (
        <HStack>
            <PageSelection data={data}/>
            <RtlSwitch />
        </HStack>
    );
}