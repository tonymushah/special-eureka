import { ChapterPage_outlet_context } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";
import React from "react";
import Actual from "./ActualDoublePage";
import useDoublePageReadingState from "./ActualDoublePage/useDoublePageReadingState";
import { DoublePagePropsProvider } from "./Provider";
import { useDoublePageImageQuery } from "./hooks/useDoublePageImageQuery";

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
    }
    return (
        <React.Fragment />
    );
}