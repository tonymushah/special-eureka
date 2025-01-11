import { Direction, RtlSidebarSubDocument } from "@mangadex/gql";
import { client } from "@mangadex/gql/urql";
import { readable } from "svelte/store";

export const isSidebarRtl = readable(false, (set) => {
	const sub = client.subscription(RtlSidebarSubDocument, {}).subscribe((res) => {
		set(res.data?.watchSidebarDirection == Direction.Rtl);
	});
	return () => {
		sub.unsubscribe();
	};
});
