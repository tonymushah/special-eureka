<script lang="ts">
	import { writable } from "svelte/store";
	import { initMangaSearchContentRatingContextStore } from "../../contexts/contentRating";
	import ContentRating from "../ContentRating.svelte";

	const contentsRatings = initMangaSearchContentRatingContextStore(writable([]));
</script>

<ContentRating />
