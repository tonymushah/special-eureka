<script lang="ts">
	import mangaListStyleStore from "./manga/list/contexts/gql";
	import { initMangaListStyleContext } from "./manga/list/contexts/style";
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	initMangaListStyleContext(mangaListStyleStore);
</script>

{@render children?.()}
