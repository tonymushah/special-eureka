import { graphql } from "@mangadex/gql";
import { ReadingMode } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { get, readable, writable, type Writable } from "svelte/store";

const readingModeSub = graphql(`
	subscription subToChapterReadingMode {
		watchReadingMode
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
	const unsub = client.subscription(readingModeSub, {}).subscribe((res) => {
		const mode = res.data?.watchReadingMode;
		if (mode) {
			set(mode);
		}
	});
	return () => {
		unsub.unsubscribe();
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
