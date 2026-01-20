<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import MangaDexTabs, { type MangaDexTabTrigger } from "../theme/tabs/MangaDexTabs.svelte";
	import Titles from "./dialog/Titles.svelte";
	import { makeScroll, preventScroll } from "../layout/scrollElement";
	import Chapter from "./dialog/Chapter.svelte";

	interface Props {
		titles: string[];
		chapters: string[];
		covers: string[];
		scanlationGroups: string[];
		users: string[];
		customLists: string[];
	}
	const titleId = "titles";
	const chapterId = "chapters";
	const coversId = "covers";
	const scanlationGroupsId = "scanlation_groups";
	const usersId = "users";
	const customListsId = "customLists";
	let {
		titles = $bindable(),
		chapters = $bindable(),
		covers = $bindable(),
		scanlationGroups = $bindable(),
		users = $bindable(),
		customLists = $bindable()
	}: Props = $props();
	let triggers = $derived.by(() => {
		return [
			{
				id: titleId,
				title: `Titles (${titles.length})`,
				disabled: titles.length == 0
			},
			{
				id: chapterId,
				title: `Chapters (${chapters.length})`,
				disabled: chapters.length == 0
			},
			{
				id: coversId,
				title: `Covers (${covers.length})`,
				disabled: chapters.length == 0
			},
			{
				id: scanlationGroupsId,
				title: `Scanlation Groups (${scanlationGroups.length})`,
				disabled: scanlationGroups.length == 0
			},
			{
				id: usersId,
				title: `Users (${users.length})`,
				disabled: users.length == 0
			},
			{
				id: customListsId,
				title: `CustomLists (${customLists.length})`,
				disabled: customLists.length == 0
			}
		] as MangaDexTabTrigger[];
	});
	onMount(() => {
		console.debug("Opening");
		preventScroll();
	});
	onDestroy(() => {
		makeScroll();
		console.debug("Closing");
	});
</script>

<div class="body">
	<MangaDexTabs bind:triggers content>
		{#snippet children(key)}
			{#if key == titleId}
				<Titles {titles} />
			{:else if key == chapterId}
				<Chapter {chapters} />
			{:else if key == coversId}
				<div class="nothing">
					<h2>wip</h2>
				</div>
			{:else if key == scanlationGroupsId}
				<div class="nothing">
					<h2>wip</h2>
				</div>
			{:else if key == usersId}
				<div class="nothing">
					<h2>wip</h2>
				</div>
			{:else if key == customListsId}
				<div class="nothing">
					<h2>wip</h2>
				</div>
			{:else}
				<div class="nothing">
					<h2>Nothing selected</h2>
				</div>
			{/if}
		{/snippet}
	</MangaDexTabs>
</div>

<style lang="scss">
	.body {
		display: contents;
	}
	.nothing {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
</style>
