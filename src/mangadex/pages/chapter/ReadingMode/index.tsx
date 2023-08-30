import { ReadingMode } from "@mangadex/api/internal/UserOptions/ReadingMode";
import useChapterReadingModeOption from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/ChapterReadingMode/useChapterReadingModeOption";
import useChapterPageOutletContext from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";
import React from "react";
import { Mangadex_suspense__ } from "@mangadex/index";
import { useDoublePageImageQuery } from "./DoublePage/hooks/useDoublePageImageQuery";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { get_aggregate_query } from "@mangadex/resources/hooks/AgreggateStateHooks/get_aggregate_query";

const LongStrip = React.lazy(() => import("./Longstrip"));

const WideStrip = React.lazy(() => import("./Widestrip"));

const SinglePage = React.lazy(() => import("./SinglePage"));

const DoublePage = React.lazy(() => import("./DoublePage"));

export default function ChapterReadingMode(){
    const outlet_data = useChapterPageOutletContext();
    const client = useHTTPClient();
    get_aggregate_query({
        aggregate_options: outlet_data.chapter.getAggregateList_options(client),
        queryOption: {
            staleTime: 1000 * 60 * 30
        }
    });
    const { query } = useChapterReadingModeOption();
    useDoublePageImageQuery({
        data : outlet_data
    });
    if(query.isSuccess) {
        switch(query.data) {
            case ReadingMode.LongStrip:
                return (
                    <React.Suspense
                        fallback={
                            <Mangadex_suspense__/>
                        }
                    >
                        <LongStrip data={outlet_data}/>
                    </React.Suspense>
                );
            case ReadingMode.SinglePage:
                return (
                    <React.Suspense
                        fallback={
                            <Mangadex_suspense__/>
                        }
                    >
                        <SinglePage data={outlet_data}/>
                    </React.Suspense>
                );
            case ReadingMode.DoublePage:
                return (
                    <React.Suspense
                        fallback={
                            <Mangadex_suspense__/>
                        }
                    >
                        <DoublePage data={outlet_data}/>
                    </React.Suspense>
                );
            case ReadingMode.WideStrip:
                return (
                    <React.Suspense
                        fallback={
                            <Mangadex_suspense__/>
                        }
                    >
                        <WideStrip data={outlet_data}/>
                    </React.Suspense>
                );
        }
    }
    return (<React.Fragment/>);
}