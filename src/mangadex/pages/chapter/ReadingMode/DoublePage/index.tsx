import { ChapterPage_outlet_context } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";
import Actual from "./ActualDoublePage";
import useDoublePageReadingState from "./ActualDoublePage/useDoublePageReadingState";
import { DoublePagePropsProvider } from "./Provider";
import { useDoublePageImageQuery } from "./hooks/useDoublePageImageQuery";
import { AbsoluteCenter, HStack, Text } from "@chakra-ui/react";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";

export type DoublePageProps = {
    data: ChapterPage_outlet_context;
};

export default function DoublePage({ data }: DoublePageProps) {
    const query = useDoublePageImageQuery({
        data
    });
    const query2 = useDoublePageReadingState({
        data
    });
    if (query.isSuccess && query2.isSuccess) {
        return (
            <DoublePagePropsProvider
                value={data}
            >
                <Actual images={query.data} />
            </DoublePagePropsProvider>
        );
    } else {
        return (
            <AbsoluteCenter>
                <HStack>
                    <MangadexSpinner size={"md"}/>
                    <Text as={"span"}>Loading...</Text>
                </HStack>
            </AbsoluteCenter>
        );
    }
}