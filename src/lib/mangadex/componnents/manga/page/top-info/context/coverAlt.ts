import { getContext, setContext } from "svelte";

const key = "top-info-cover-alt";

type TopInfoCoverAlt = string;

export function setTopCoverAltContextStore(coverAlt: TopInfoCoverAlt) {
	return setContext<TopInfoCoverAlt>(key, coverAlt);
}

export function getTopCoverAltContextStore() {
	const coverAltContext = getContext<TopInfoCoverAlt | undefined>(key);
	if (coverAltContext) {
		return coverAltContext;
	} else {
		throw new Error(`\`${key}\` is not declared`);
	}
}
