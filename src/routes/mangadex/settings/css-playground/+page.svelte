<script lang="ts">
	import MangaDexTabs from "@mangadex/componnents/theme/tabs/MangaDexTabs.svelte";
	import ToastForStories from "@mangadex/componnents/theme/toast/ToastForStories.svelte";
	import { melt } from "@melt-ui/svelte";
	import { cubicInOut } from "svelte/easing";
	import { crossfade, fade, slide } from "svelte/transition";
	const triggers = [
		{
			id: "tab-1",
			title: "Mangas"
		},
		{
			id: "tab-2",
			title: "Cover"
		},
		{
			id: "tab-3",
			title: "Chapter"
		}
	];
</script>

<section>
	<h2>Tabs</h2>
	<div>
		<MangaDexTabs {triggers} defaultValue="tab-1">
			{#snippet children(content)}
				{#if content == "tab-1"}
					<div
						role="tabpanel"
						aria-labelledby="tab-1"
						transition:slide={{
							axis: "y"
						}}
					>
						<h3>Mangas lol</h3>
						<ToastForStories
							title="Something"
							description="sadadasd"
							color="var(--danger)"
						/>
					</div>
				{/if}
				{#if content == "tab-2"}
					<div
						role="tabpanel"
						aria-labelledby="tab-2"
						transition:slide={{
							axis: "y"
						}}
					>
						<h3>Covers lol</h3>
					</div>
				{/if}
				{#if content == "tab-3"}
					<div
						role="tabpanel"
						aria-labelledby="tab-3"
						transition:slide={{
							axis: "y"
						}}
					>
						<h3>Chapters lol</h3>
					</div>
				{/if}
			{/snippet}
		</MangaDexTabs>
	</div>
</section>
