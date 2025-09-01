<script lang="ts">
	import type { Language } from "@mangadex/gql/graphql";
	import get_cover_art from "@mangadex/utils/cover-art/get_cover_art";

	interface Props {
		mangaId: string;
		coverId: string;
		title: Map<string, string>;
		originalLanguage: Language;
		tag: {
			id: string;
			name: Map<string, string>;
		}[];
	}

	let { mangaId, coverId }: Props = $props();

	const cover_art = get_cover_art({
		cover_id: coverId,
		manga_id: mangaId
	});
</script>

<article>
	<img />
</article>
