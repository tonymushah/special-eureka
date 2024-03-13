<script lang="ts">
	import { writable, type Readable } from "svelte/store";
	import { setTopCoverAltContextStore, setTopCoverContextStore } from "./context";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import type { MangaStatus } from "@mangadex/gql/graphql";

	type Authors = {
		id: string;
		name: string;
	};
	export let id: string;
	export let title: string;
	export let altTitle: string | undefined = undefined;
	export let coverImage: Readable<string | undefined>;
	export let coverImageAlt: string;
	export let authors: Authors;
	export let tags: Tag[];
	export let status: MangaStatus;
	export let year: number | undefined = undefined;
	export let description: string | undefined = undefined;

	setTopCoverContextStore(coverImage);
	setTopCoverAltContextStore(coverImageAlt);
</script>
