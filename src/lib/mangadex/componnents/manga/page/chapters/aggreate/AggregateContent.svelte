<script lang="ts" context="module">
	export type MangaAggregateData = Volume[];
	export type Volume = {
		volume: string;
		chapters: Chapters[];
	};
	export type Chapters = {
		chapter: string;
		ids: string[];
	};
</script>

<script lang="ts">
	import { onMount, type ComponentProps } from "svelte";
	import VolumeAccordion from "./VolumeAccordion.svelte";
	import type { ChapterStores } from "./utils/chapterStores";
	import ChapterElement1, {
		createChapterEl1EventDispatcher
	} from "@mangadex/componnents/chapter/base/element1/ChapterElement1.svelte";
	import Volumes from "./Volumes.svelte";

	const dispatch = createChapterEl1EventDispatcher();

	export let volumes: MangaAggregateData;
	export let chaptersStore: ChapterStores;
	let data: ComponentProps<VolumeAccordion>[] = [];
	$: {
		const store = $chaptersStore;
		data = volumes.map((volume) => {
			return {
				title: volume.volume,
				volumeContent: volume.chapters.map((chapter) => {
					const ids = chapter.ids;
					let chapters: ComponentProps<ChapterElement1>[] = [];
					ids.forEach((id) => {
						const res = store.get(id);
						if (res) {
							chapters.push(res);
						}
					});
					return {
						title: chapter.chapter,
						chapters
					};
				})
			};
		});
	}
</script>

<Volumes
	openStart
	bind:volumes={data}
	on:download={({ detail }) => {
		dispatch("download", detail);
	}}
	on:downloadKeyPress={({ detail }) => {
		dispatch("downloadKeyPress", detail);
	}}
	on:read={({ detail }) => {
		dispatch("read", detail);
	}}
	on:readKeyPress={({ detail }) => {
		dispatch("readKeyPress", detail);
	}}
	on:remove={({ detail }) => {
		dispatch("remove", detail);
	}}
	on:removeKeyPress={({ detail }) => {
		dispatch("removeKeyPress", detail);
	}}
/>
