<script lang="ts">
	import MangaDexTabs from "@mangadex/componnents/theme/tabs/MangaDexTabs.svelte";
	import Chapters from "./(states)/Chapters.svelte";
	import Mangas from "./(states)/Mangas.svelte";
	import Covers from "./(states)/Covers.svelte";
</script>

<MangaDexTabs
	triggers={[
		{
			id: "chapters",
			title: "Chapters"
		},
		{
			id: "mangas",
			title: "Mangas"
		},
		{
			id: "covers",
			title: "Covers"
		}
	]}
	defaultValue="chapters"
>
	{#snippet children(content)}
		{#if content == "chapters"}
			<div>
				<Chapters />
			</div>
		{/if}
		{#if content == "mangas"}
			<div>
				<Mangas />
			</div>
		{/if}
		{#if content == "covers"}
			<div>
				<Covers />
			</div>
		{/if}
	{/snippet}
</MangaDexTabs>
