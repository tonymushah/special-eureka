<script lang="ts">
	import { CustomListVisibility } from "@mangadex/gql/graphql";
	import type { PageData } from "./$types";
	import { readonly, writable } from "svelte/store";
	import SearchContent from "./SearchContent.svelte";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
	let isPrivate = $derived(data.attributes.visibility == CustomListVisibility.Private);

	let customListId = $derived<string>(data.id);
</script>

<AppTitle title="{data.attributes.name} feed - MangaDex" />

<SearchContent {customListId} {isPrivate} />
