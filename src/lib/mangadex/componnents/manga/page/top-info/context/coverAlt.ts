import type { ReadonlyValue } from "$lib";
import { Context } from "runed";

const key = "top-info-cover-alt";

type TopInfoCoverAlt = string;

const ctx = new Context<ReadonlyValue<TopInfoCoverAlt>>(key);

export function setTopCoverAltContextStore(coverAlt: () => TopInfoCoverAlt) {
	return ctx.set({
		get value() {
			return coverAlt();
		}
	});
}

export function getTopCoverAltContextStore() {
	return ctx.get();
}
