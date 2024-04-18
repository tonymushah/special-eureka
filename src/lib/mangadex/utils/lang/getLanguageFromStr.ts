import { graphql } from "@mangadex/gql";
import type { Language } from "@mangadex/gql/graphql";
import { queryStore, type Client } from "@urql/svelte";
import { derived, type Readable } from "svelte/store";

const query = graphql(`
    query getLanguageFromStr($lang: String!) {
        utils {
            strToLanguage(input: $lang)
        }
    }
`);

type GLFSArgs = {
    lang: string,
    client: Client
}

export default function getLanguageFromStr({
    lang,
    client
}: GLFSArgs): Readable<Language | undefined> {
    const initialQueryStore = queryStore({
        query,
        client,
        variables: {
            lang
        }
    });
    return derived(initialQueryStore, ($r) =>
        $r.data?.utils.strToLanguage
    );
}