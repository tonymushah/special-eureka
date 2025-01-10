<script lang="ts" module>
	import type { Language } from "@mangadex/gql/graphql";

	export type CoverInput = {
		id: string;
		title: string;
		alt: string;
		locale?: Language;
	};
</script>

<script lang="ts">
	import MangaPageCovers from "./MangaPageCovers.svelte";
	import type { MangaCoversItem } from "./MangaPageCovers.svelte";

	import { getCoversImageStoreContext } from "./utils/coverImageStoreContext";

	interface Props {
		covers: CoverInput[];
	}

	let { covers }: Props = $props();
	const images = getCoversImageStoreContext();
	let data: MangaCoversItem[] = $state([]);
	$effect(() => {
		const store = $images;
		const res: MangaCoversItem[] = [];
		covers.forEach((cover) => {
			const image = store.get(cover.id);

			if (image)
				res.push({
					title: cover.title,
					alt: cover.alt,
					coverImage: image
				});
		});
		data = res;
	});
</script>

<MangaPageCovers items={data} />
