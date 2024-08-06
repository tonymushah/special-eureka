import { graphql } from "@mangadex/gql";
import { ImageFit } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { sub_end } from "@mangadex/utils";
import { get, readable, type Writable } from "svelte/store";
import { v4 } from "uuid";

const imageFitSub = graphql(`
	subscription subToChapterImageFit($subId: UUID!) {
		watchImageFit(subId: $subId)
	}
`);

const imageFitMutation = graphql(`
	mutation updateChapterImageFit($imageFit: ImageFit!) {
		userOption {
			setImageFit(imageFit: $imageFit)
		}
	}
`);

const base = readable(ImageFit.Default, (set, update) => {
	const sub_id = v4();
	const unsub = client
		.subscription(imageFitSub, {
			subId: sub_id
		})
		.subscribe((res) => {
			const imageFit = res.data?.watchImageFit;
			if (imageFit) {
				set(imageFit);
			}
		});
	return () => {
		unsub.unsubscribe();
		sub_end(sub_id);
	};
});

async function setImageFit(imageFit: ImageFit) {
	await client.mutation(imageFitMutation, {
		imageFit
	});
}

const imageFitWritable: Writable<ImageFit> = {
	subscribe(run, invalidate) {
		return base.subscribe(run, invalidate);
	},
	set(value) {
		setImageFit(value).catch(console.error);
	},
	update(updater) {
		setImageFit(updater(get(base))).catch(console.error);
	}
};

export default imageFitWritable;
