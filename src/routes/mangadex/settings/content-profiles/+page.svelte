<script lang="ts">
	import ContentProfilesEditor from "@mangadex/componnents/content-profiles/ContentProfilesEditor.svelte";
	import ContentProfileSelector from "@mangadex/componnents/content-profiles/ContentProfileSelector.svelte";
	import type { PageData } from "./$types";
	import { readonly, writable } from "svelte/store";
	import type { TagGroup } from "@mangadex/gql/graphql";
	interface Props {
		data: PageData;
	}
	let { data = $bindable() }: Props = $props();
	const tags = writable<
		{
			id: string;
			name: string;
			group: TagGroup;
		}[]
	>([]);
	$effect(() => {
		const dataTags = data.tags;
		if (dataTags) {
			tags.set(dataTags);
		}
	});
</script>

<section class="selector">
	<ContentProfileSelector />
</section>
<section class="editor">
	<ContentProfilesEditor tags={readonly(tags)} />
</section>

<style lang="scss">
	.editor {
		margin-top: 10px;
	}
</style>
