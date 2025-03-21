<script lang="ts">
	import { writable } from "svelte/store";
	import { initMangaSearchPublicationStatusContextStore } from "../../contexts/publicationStatus";
	import PublicationStatus from "../PublicationStatus.svelte";

	const selected = initMangaSearchPublicationStatusContextStore(writable([]));
</script>

<PublicationStatus />
