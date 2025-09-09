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
	import ChapterElement1, {
		type ChapterEl1Events
	} from "@mangadex/componnents/chapter/base/element1/ChapterElement1.svelte";
	import { type ComponentProps } from "svelte";
	import VolumeAccordion from "./VolumeAccordion.svelte";
	import Volumes from "./Volumes.svelte";
	import { getChapterStoreContext, type ChapterStores } from "./utils/chapterStores";
	import { setContextMenuContext } from "@special-eureka/core/utils/contextMenuContext";

	interface Props extends ChapterEl1Events {
		volumes: MangaAggregateData;
	}

	let { volumes, ...events }: Props = $props();
	const chaptersStore: ChapterStores = getChapterStoreContext();
	let data: ComponentProps<typeof VolumeAccordion>[] = $state([]);
	$effect(() => {
		const store = $chaptersStore;
		data = volumes.map((volume) => {
			return {
				title: volume.volume,
				volumeContent: volume.chapters.map((chapter) => {
					const ids = chapter.ids;
					let chapters: ComponentProps<typeof ChapterElement1>[] = [];
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
	setContextMenuContext([]);
</script>

<Volumes openStart volumes={data} {...events} />
