<script lang="ts">
	import { writable } from "svelte/store";
	import { initMangaSearchPublicationDemographicContextStore } from "../../contexts/publicationDemographic";
	import PublicationDemographic from "../PublicationDemographic.svelte";

	const demographics = initMangaSearchPublicationDemographicContextStore(writable([]));
</script>

<PublicationDemographic />
