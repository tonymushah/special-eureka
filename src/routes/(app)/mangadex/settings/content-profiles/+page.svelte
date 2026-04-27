<script lang="ts">
	import ContentProfilesEditor from "@mangadex/componnents/content-profiles/ContentProfilesEditor.svelte";
	import ContentProfileSelector from "@mangadex/componnents/content-profiles/ContentProfileSelector.svelte";
	import type { PageData } from "./$types";
	import { readonly, writable } from "svelte/store";
	import type { TagGroup } from "@mangadex/gql/graphql";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	import PageTitle from "@mangadex/componnents/pages/PageTitle.svelte";
	interface Props {
		data: PageData;
	}
	let { data = $bindable() }: Props = $props();
	let tags = $derived.by<
		{
			id: string;
			name: string;
			group: TagGroup;
		}[]
	>(() => {
		const dataTags = data.tags;
		if (dataTags) {
			return dataTags;
		} else {
			return [];
		}
	});
</script>

<AppTitle title="Content Profiles - MangaDex" />

<PageTitle titleType={1} title={"Content Profiles"} withReturn />

<section class="selector">
	<ContentProfileSelector />
</section>
<section class="editor">
	<ContentProfilesEditor {tags} />
</section>

<style lang="scss">
	.editor {
		margin-top: 10px;
	}
</style>
