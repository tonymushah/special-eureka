import { graphql } from "@mangadex/gql";
import { Client, queryStore } from "@urql/svelte";
import { derived, type Readable } from "svelte/store";
import bufToImageSrc from "../bufToImageSrc";

const faviconQuery = graphql(`
	query favicon($url: Url!) {
		utils {
			favicon(url: $url)
		}
	}
`);

export function getFaviconSrc({ url, client }: { url: string, client: Client }): Readable<string | undefined> {
    return derived(queryStore({
        query: faviconQuery,
        client,
        variables: {
            url: url
        }
    }), ($r) => {
        const data = $r.data;
        if (data) {
            return bufToImageSrc(data.utils.favicon);
        }
    })
}