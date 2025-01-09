import { graphql } from "@mangadex/gql";
import { client } from "@mangadex/gql/urql";
import { get, readable, type Writable } from "svelte/store";

const longstripImageWidthSub = graphql(`
	subscription subToChapterLongstripImageWidth {
		watchLongstripImageWidth
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
	const unsub = client.subscription(longstripImageWidthSub, {}).subscribe((res) => {
		const width = res.data?.watchLongstripImageWidth;
		if (width) {
			set(width);
		}
	});
	return () => {
		unsub.unsubscribe();
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
