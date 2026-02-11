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

	interface Props {
		covers: CoverInput[];
	}

	let { covers }: Props = $props();
	let data: MangaCoversItem[] = $derived.by(() => {
		const res: MangaCoversItem[] = [];
		covers.forEach((cover) => {
			res.push({
				title: cover.title,
				alt: cover.alt,
				id: cover.id
			});
		});
		return res;
	});
</script>

<MangaPageCovers items={data} />
