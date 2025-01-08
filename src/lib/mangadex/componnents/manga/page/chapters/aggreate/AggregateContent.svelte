<script lang="ts" module>
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
	import { run } from 'svelte/legacy';

	import { onMount, type ComponentProps, createEventDispatcher } from "svelte";
	import VolumeAccordion from "./VolumeAccordion.svelte";
	import { getChapterStoreContext, type ChapterStores } from "./utils/chapterStores";
	import ChapterElement1, {
		type ChapterEl1Events
	} from "@mangadex/componnents/chapter/base/element1/ChapterElement1.svelte";
	import Volumes from "./Volumes.svelte";

	const dispatch = createEventDispatcher<ChapterEl1Events>();

	interface Props {
		volumes: MangaAggregateData;
	}

	let { volumes }: Props = $props();
	const chaptersStore: ChapterStores = getChapterStoreContext();
	let data: ComponentProps<VolumeAccordion>[] = $state([]);
	run(() => {
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
	});
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
	on:comments={({ detail }) => {
		dispatch("comments", detail);
	}}
	on:commentsKeyPress={({ detail }) => {
		dispatch("commentsKeyPress", detail);
	}}
/>
