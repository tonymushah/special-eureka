import { HStack } from "@chakra-ui/react";
import { ChapterPage_outlet_context } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";
import RtlSwitch from "../ChapterReadingOption/RtlMode";
import PageSelection from "@mangadex/pages/chapter/ReadingMode/DoublePage/PageSelection";

export default function DoublePageReadingOption({ data } : {
    data : ChapterPage_outlet_context
}){
    return (
        <HStack spacing={"1"}>
            <PageSelection chapter={data.chapter}/>
            <RtlSwitch/>
        </HStack>
    );
}