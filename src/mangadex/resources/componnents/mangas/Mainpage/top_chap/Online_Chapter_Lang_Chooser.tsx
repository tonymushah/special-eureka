import useLanguageUserOption from "@mangadex/resources/hooks/userOptions/SelectLanguage";
import * as Chakra from "@chakra-ui/react";
import "@commons-res/flag-icons/less/flag-icons.less";
import React from "react";
import ErrorEL1 from "../../../error/ErrorEL1";
import { MangaPageProps } from "../../Manga_Page";
import Loading from "../loading";

const Manga_Page_Aggregate = React.lazy(() => import("./Manga_Page_Aggregate"));

export default function Online_Chapter_Lang_Chooser(props: MangaPageProps) {
    const { query } = useLanguageUserOption();
    if (query.isLoading) {
        return (
            <Chakra.Box m={2} bg="inherit">
                <Loading/>
            </Chakra.Box>
        );
    }
    if (query.isError) {
        return (
            <ErrorEL1
                error={query.error}
            />
        );
    }
    if (query.isSuccess) {
        return (
            <Chakra.Box>
                <React.Suspense
                    fallback={
                        <Chakra.Box m={2} bg="inherit">
                            <Loading/>
                        </Chakra.Box>
                    }
                >
                    <Manga_Page_Aggregate
                        src={props.src}
                        to_see_lang={query.data.map((value) => value.get_two_letter())}
                    />
                </React.Suspense>
            </Chakra.Box>
        );
    }
    return (
        <Chakra.Box m={2} bg="inherit">
            <Loading/>
        </Chakra.Box>
    );
}
