<script lang="ts">
	import mangaListStyleStore from "./manga/list/contexts/gql";
	import { initMangaListStyleContext } from "./manga/list/contexts/style";

	initMangaListStyleContext(mangaListStyleStore);
</script>

<slot />
