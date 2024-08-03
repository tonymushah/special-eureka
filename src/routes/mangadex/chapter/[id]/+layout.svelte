<script lang="ts" context="module">
	// TODO Add oneshot support
	function layoutDataToCurrentChapterData({ data }: LayoutData): CurrentChapterData {
		const id: string = data.id;
		const volume =
			data.attributes.volume == null || data.attributes.volume == undefined
				? undefined
				: data.attributes.volume;
		const title =
			data.attributes.title == null || data.attributes.title == undefined
				? undefined
				: data.attributes.title;
		const chapterNumber =
			data.attributes.volume == null || data.attributes.volume == undefined
				? undefined
				: data.attributes.volume;
		const uploader = new CurrentChapterUploader({
			id: data.relationships.user.id,
			name: data.relationships.user.attributes.username,
			roles: data.relationships.user.attributes.roles
		});
		const scans_groups = data.relationships.scanlationGroups.map(
			(group) =>
				new CurrentChapterGroup({
					name: group.attributes.name,
					id: group.id
				})
		);
		const series = new CurrentChapterTitle({
			id: data.relationships.manga.id,
			title:
				get_value_from_title_and_random_if_undefined(
					data.relationships.manga.attributes.title,
					"en"
				) ?? ""
		});
		return new CurrentChapterData({
			id,
			uploader,
			title,
			chapterNumber,
			series,
			translatedLanguage: data.attributes.translatedLanguage,
			groups: scans_groups,
			volume
		});
	}
</script>

<script lang="ts">
	import type { LayoutData } from "./$types";
	import { writable } from "svelte/store";
	import {
		CurrentChapterData,
		CurrentChapterGroup,
		CurrentChapterTitle,
		CurrentChapterUploader,
		initCurrentChapterData
	} from "@mangadex/componnents/chapter/page/contexts/currentChapter";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";

	export let data: LayoutData;

	const currentChapterData = writable(layoutDataToCurrentChapterData(data));
	initCurrentChapterData(currentChapterData);
	$: currentChapterData.set(layoutDataToCurrentChapterData(data));
</script>

<slot />
