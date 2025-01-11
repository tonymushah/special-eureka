import { Direction, graphql, RtlSidebarSubDocument } from "@mangadex/gql/exports";
import { client } from "@mangadex/gql/urql";
import { derived, readable, type Writable } from "svelte/store";

const __isSidebarRtl = readable(Direction.Ltr, (set) => {
	const sub = client.subscription(RtlSidebarSubDocument, {}).subscribe((res) => {
		set(res.data?.watchSidebarDirection ?? Direction.Ltr);
	});
	return () => {
		sub.unsubscribe();
	};
});

const _isSidebarRtl = derived(__isSidebarRtl, ($dir) => $dir == Direction.Rtl);

const mutation = graphql(`
	mutation setSidebarDirection($direction: Direction!) {
		userOption {
			setSidebarDirection(direction: $direction)
		}
	}
`);

export const isSidebarRtl: Writable<boolean> = {
	subscribe(run, invalidate) {
		return _isSidebarRtl.subscribe(run, invalidate);
	},
	set(value) {},
	update(updater) {}
};
