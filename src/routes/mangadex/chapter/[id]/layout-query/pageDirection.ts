import { graphql } from "@mangadex/gql";
import { Direction } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { get, readable, type Writable } from "svelte/store";
import { v4 } from "uuid";

const readingDirectionSub = graphql(`
	subscription subToChapterReadingDirection {
		watchPageDirection
	}
`);

const readingDirectionMutation = graphql(`
	mutation updateChapterReadingDirection($direction: Direction!) {
		userOption {
			setPageDirection(direction: $direction)
		}
	}
`);

const base = readable(Direction.Ltr, (set, update) => {
	const sub_id = v4();
	const unsub = client.subscription(readingDirectionSub, {}).subscribe((res) => {
		const direction = res.data?.watchPageDirection;
		if (direction) {
			set(direction);
		}
	});
	return () => {
		unsub.unsubscribe();
	};
});

async function setReadingMode(direction: Direction) {
	await client.mutation(readingDirectionMutation, {
		direction
	});
}

const readingDirectionWritable: Writable<Direction> = {
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

export default readingDirectionWritable;
