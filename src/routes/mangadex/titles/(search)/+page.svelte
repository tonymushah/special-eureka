<script lang="ts">
	import MangaSearchForm from "@mangadex/componnents/manga/search/form/MangaSearchForm.svelte";
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import SearchContent from "./SearchContent.svelte";
	import MidToneLine from "@mangadex/componnents/theme/lines/MidToneLine.svelte";
</script>

<section class="title">
	<Title>Advanced Titles Search</Title>
</section>

<MangaSearchForm />

<MidToneLine />

<SearchContent />
