import { Author } from "@mangadex/api/structures/Author";
import { Mangadex_suspense, Mangadex_suspense__ } from "@mangadex/index";
import { get_author_byID, get_author_queryKey_byID } from "@mangadex/resources/hooks/AuthorState";
import { useAppWindowTitle } from "@mangadex/resources/hooks/TauriAppWindow";
import React from "react";
import { LoaderFunction, useParams } from "react-router-dom";

const ErrorEL1 = React.lazy(() => import("@mangadex/resources/componnents/error/ErrorEL1"));
const Author_Page = React.lazy(() => import("@mangadex/resources/componnents/authors/Author_Page"));

function useLoader() {
    const { id } = useParams();
    const { query } = get_author_byID({
        author_id: id!,
        options : {
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

export const loader: LoaderFunction = async function ({ params }) {
    const { id } = params;
    if (id != undefined) {
        try {
            const { queryClient } = await import("@mangadex/resources/query.client");
            const _queryKey_ = get_author_queryKey_byID({
                author_id : id
            });
            const queryData = queryClient.getQueryData<Author>(_queryKey_, {
                exact: true
            });
            if (queryData != undefined) {
                    if (queryData.get_relationships() == undefined || queryData.get_relationships()?.length == 0) {
                        await queryClient.prefetchQuery(_queryKey_, () => Author.getAuthorById(id));
                        return new Response(null, {
                            "status": 204,
                            "statusText": "Loaded"
                        });
                    } else {
                        return new Response(null, {
                            "status": 204,
                            "statusText": "Loaded"
                        });
                    }
            } else {
                await queryClient.prefetchQuery(_queryKey_, () => Author.getAuthorById(id));
                return new Response(null, {
                    "status": 204,
                    "statusText": "Loaded"
                });
            }
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            } else {
                throw new Response(JSON.stringify(e), {
                    status: 500,
                    statusText: "Internal Loader Error"
                });
            }
        }
    } else {
        throw new Response(undefined, {
            "status": 404,
            "statusText": "Author ID Undefined"
        });
    }
};