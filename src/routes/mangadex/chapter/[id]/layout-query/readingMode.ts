import { graphql } from "@mangadex/gql";
import { ReadingMode } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { sub_end } from "@mangadex/utils";
import { get, readable, writable, type Writable } from "svelte/store";
import { v4 } from "uuid";

const readingModeSub = graphql(`
	subscription subToChapterReadingMode($subId: UUID!) {
		watchReadingMode(subId: $subId)
	}
`);

const readingModeMutation = graphql(`
	mutation updateChapterReadingMode($mode: ReadingMode!) {
		userOption {
			setReadingMode(mode: $mode)
		}
	}
`);

const base = readable(ReadingMode.SinglePage, (set, update) => {
	const sub_id = v4();
	const unsub = client
		.subscription(readingModeSub, {
			subId: sub_id
		})
		.subscribe((res) => {
			const mode = res.data?.watchReadingMode;
			if (mode) {
				set(mode);
			}
		});
	return () => {
		unsub.unsubscribe();
		sub_end(sub_id);
	};
});

async function setReadingMode(mode: ReadingMode) {
	await client.mutation(readingModeMutation, {
		mode
	});
}

const readingModeWritable: Writable<ReadingMode> = {
	subscribe(run, invalidate) {
		return base.subscribe(run, invalidate);
	},
	set(value) {
		setReadingMode(value).catch(console.error);
	},
	update(updater) {
		setReadingMode(updater(get(base))).catch(console.error);
	}
};

export default readingModeWritable;
