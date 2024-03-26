<script lang="ts">
	import MangaPageTopInfo from "@mangadex/componnents/manga/page/top-info/MangaPageTopInfo.svelte";
	import type { LayoutData } from "./$types";

	export let data: LayoutData;

	$: layoutData = data.layoutData!;
</script>

<MangaPageTopInfo
	bind:id={layoutData.id}
	title={layoutData.title ?? ""}
	altTitle={layoutData.altTitle}
	coverImage={layoutData.coverImage}
	coverImageAlt={layoutData.coverImageAlt}
	authors={layoutData.authors}
	tags={layoutData.tags}
	status={layoutData.status}
	year={layoutData.year ?? undefined}
/>

<slot />
