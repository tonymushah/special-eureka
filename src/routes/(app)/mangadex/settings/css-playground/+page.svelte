<script lang="ts">
	import CustomListCheckbox from "@mangadex/componnents/manga/add-to-list/CustomListCheckbox.svelte";
	import MakeANewList from "@mangadex/componnents/manga/add-to-list/MakeANewList.svelte";
	import MangaDexTabs from "@mangadex/componnents/theme/tabs/MangaDexTabs.svelte";
	import ToastForStories from "@mangadex/componnents/theme/toast/ToastForStories.svelte";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	import { slide } from "svelte/transition";
	import { v4 } from "uuid";
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

<AppTitle title="CSS Playground - MangaDex" />

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
						<CustomListCheckbox name="Something" onChange={(e) => console.debug(e)} />
						<div class="make">
							<MakeANewList mangaId={v4()} />
						</div>
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

<style lang="scss">
	.make {
		margin: 10px 0px;
	}
</style>
