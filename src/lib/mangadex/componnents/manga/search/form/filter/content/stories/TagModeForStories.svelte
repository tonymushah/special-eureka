<script lang="ts">
	import { writable } from "svelte/store";
	import { defaultTagModes, initMangaSearchTagModeContext } from "../../contexts/tagModes";
	import TagMode from "../TagMode.svelte";

	initMangaSearchTagModeContext(writable(defaultTagModes()));
</script>

<TagMode />
