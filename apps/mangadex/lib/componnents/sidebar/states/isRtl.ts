import { Direction, graphql, RtlSidebarSubDocument } from "@mangadex/gql/exports";
import { client } from "@mangadex/gql/urql";
import { derived, get, readable, type Writable } from "svelte/store";

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
	set(value) {
		client
			.mutation(mutation, {
				direction: value ? Direction.Rtl : Direction.Ltr
			})
			.toPromise()
			.catch(console.error);
	},
	update(updater) {
		const value = updater(get(_isSidebarRtl));
		client
			.mutation(mutation, {
				direction: value ? Direction.Rtl : Direction.Ltr
			})
			.toPromise()
			.catch(console.error);
	}
};
