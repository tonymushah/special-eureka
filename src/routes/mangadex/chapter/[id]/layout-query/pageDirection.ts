import { graphql } from "@mangadex/gql";
import { Direction } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { sub_end } from "@mangadex/utils";
import { get, readable, writable, type Writable } from "svelte/store";
import { v4 } from "uuid";

const readingDirectionSub = graphql(`
	subscription subToChapterReadingDirection($subId: UUID!) {
		watchPageDirection(subId: $subId)
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
	const unsub = client
		.subscription(readingDirectionSub, {
			subId: sub_id
		})
		.subscribe((res) => {
			const direction = res.data?.watchPageDirection;
			if (direction) {
				set(direction);
			}
		});
	return () => {
		unsub.unsubscribe();
		sub_end(sub_id);
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
