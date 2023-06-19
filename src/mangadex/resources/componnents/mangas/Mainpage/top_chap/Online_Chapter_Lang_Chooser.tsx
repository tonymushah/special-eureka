import useLanguageUserOption from "@mangadex/resources/hooks/userOptions/SelectLanguage";
import * as Chakra from "@chakra-ui/react";
import "flag-icons/css/flag-icons.min.css";
import React from "react";
import { Spinner } from "react-bootstrap";
import ErrorEL1 from "../../../error/ErrorEL1";
import { MangaPageProps } from "../../Manga_Page";

const Manga_Page_Aggregate = React.lazy(() => import("./Manga_Page_Aggregate"));

export default function Online_Chapter_Lang_Chooser(props: MangaPageProps) {
    const { query } = useLanguageUserOption();
    if (query.isLoading == true && query.isRefetching) {
        return (
            <Chakra.Box m={2} bg="inherit">
                <div className=" text-center">
                    <Spinner
                        animation="border"
                    ></Spinner>
                    <br />
                    <p>Loading chapters ...</p>
                </div>
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
                            <div className=" text-center">
                                <Spinner
                                    animation="border"
                                ></Spinner>
                                <br />
                                <p>Loading chapters ...</p>
                            </div>
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
            <div className=" text-center">
                <Spinner
                    animation="border"
                ></Spinner>
                <br />
                <p>Loading chapters ...</p>
            </div>
        </Chakra.Box>
    );
}
