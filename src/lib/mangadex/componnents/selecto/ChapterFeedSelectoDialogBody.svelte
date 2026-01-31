<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import MangaDexTabs, { type MangaDexTabTrigger } from "../theme/tabs/MangaDexTabs.svelte";
	import Titles from "./dialog/Titles.svelte";
	import { makeScroll, preventScroll } from "../layout/scrollElement";
	import Chapter from "./dialog/Chapter.svelte";
	import { TabContent } from "@ark-ui/svelte/tabs";
	import cssMod from "./dialog-body.module.scss";
	import Covers from "./dialog/Covers.svelte";

	interface Props {
		titles?: string[];
		chapters?: string[];
		covers?: string[];
		scanlationGroups?: string[];
		users?: string[];
		customLists?: string[];
	}
	const titleId = "titles";
	const chapterId = "chapters";
	const coversId = "covers";
	const scanlationGroupsId = "scanlation_groups";
	const usersId = "users";
	const customListsId = "customLists";
	let {
		titles = $bindable([]),
		chapters = $bindable([]),
		covers = $bindable([]),
		scanlationGroups = $bindable([]),
		users = $bindable([]),
		customLists = $bindable([])
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

<MangaDexTabs {triggers} content lazyMount unmountOnExit>
	<TabContent value={titleId} class={cssMod.content}>
		<Titles {titles} />
	</TabContent>
	<TabContent value={chapterId} class={cssMod.content}>
		<Chapter {chapters} />
	</TabContent>
	<TabContent value={coversId} class={cssMod.content}>
		<Covers {covers} />
	</TabContent>
	<TabContent value={scanlationGroupsId} class={cssMod.content}>
		<p>nothing</p>
	</TabContent>
	<TabContent value={usersId} class={cssMod.content}>
		<p>nothing</p>
	</TabContent>
	<TabContent value={customListsId} class={cssMod.content}>
		<p>nothing</p>
	</TabContent>
</MangaDexTabs>
