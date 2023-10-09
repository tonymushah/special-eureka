import { Mangadex_suspense, Mangadex_suspense__ } from "@mangadex/index";
import { get_author_byID } from "@mangadex/resources/hooks/AuthorState";
import { useAppWindowTitle } from "@mangadex/resources/hooks/TauriAppWindow";
import React from "react";
import { useParams } from "react-router-dom";

const ErrorEL1 = React.lazy(() => import("@mangadex/resources/componnents/error/ErrorEL1"));
const Author_Page = React.lazy(() => import("@mangadex/resources/componnents/authors/Author_Page"));

function useLoader() {
    const { id } = useParams();
    const { query } = get_author_byID({
        author_id: id!,
        options: {
            staleTime: Infinity,
            enabled: !!id
        }
    });
    return {
        query,
        id
    };
}

function Success() {
    const { query } = useLoader();
    if (query.isSuccess) {
        return (
            <Mangadex_suspense>
                <Author_Page
                    src={query.data}
                />
            </Mangadex_suspense>
        );
    } else {
        return (
            <React.Fragment />
        );
    }
}

function Error_() {
    const { query, id } = useLoader();
    const setTitle = useAppWindowTitle();
    React.useEffect(() => {
        setTitle(`Error on loading author ${id!} | Mangadex`);
    }, []);
    if (query.isError) {
        return (
            <Mangadex_suspense>
                <ErrorEL1
                    error={query.error}
                />
            </Mangadex_suspense>
        );
    } else {
        return (
            <React.Fragment />
        );
    }
}

export default function Author_Page_index() {
    const { query } = useLoader();
    const setTitle = useAppWindowTitle();
    React.useEffect(() => {
        setTitle("Loading... | Mangadex");
    }, []);
    if (query.isSuccess) {
        return (
            <Success />
        );
    } else if (query.isError) {
        return (
            <Error_ />
        );
    } else {
        return (
            <Mangadex_suspense__ />
        );
    }
}

