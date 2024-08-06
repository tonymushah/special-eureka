import { graphql } from "@mangadex/gql";
import { ImageFit } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { sub_end } from "@mangadex/utils";
import { get, readable, type Writable } from "svelte/store";
import { v4 } from "uuid";

const longstripImageWidthSub = graphql(`
	subscription subToChapterLongstripImageWidth($subId: UUID!) {
		watchLongstripImageWidth(subId: $subId)
	}
`);

const longstripImageWidthMutation = graphql(`
	mutation updateChapterLongstripImageWidth($width: Float!) {
		userOption {
			setLongstripImageWidth(width: $width)
		}
	}
`);

const base = readable(0, (set, update) => {
	const sub_id = v4();
	const unsub = client
		.subscription(longstripImageWidthSub, {
			subId: sub_id
		})
		.subscribe((res) => {
			const width = res.data?.watchLongstripImageWidth;
			if (width) {
				set(width);
			}
		});
	return () => {
		unsub.unsubscribe();
		sub_end(sub_id);
	};
});

async function setWidth(width: number) {
	await client.mutation(longstripImageWidthMutation, {
		width
	});
}

const longstripImageWidthWritable: Writable<number> = {
	subscribe(run, invalidate) {
		return base.subscribe(run, invalidate);
	},
	set(value) {
		setWidth(value).catch(console.error);
	},
	update(updater) {
		setWidth(updater(get(base))).catch(console.error);
	}
};

export default longstripImageWidthWritable;
