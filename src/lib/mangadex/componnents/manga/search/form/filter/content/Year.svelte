<script lang="ts">
	import FormInput from "@mangadex/componnents/theme/form/input/FormInput.svelte";
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import { getMangaSearchYearContextStoreWritable } from "../contexts/year";

	const year = getMangaSearchYearContextStoreWritable();
</script>

<section class="layout">
	<Title type={3}>Year</Title>
	<div class="content">
		<FormInput
			bind:value={$year}
			inputProps={{ placeholder: "Publication Year", type: "number" }}
		/>
	</div>
</section>

<style lang="scss">
	.layout {
		display: grid;
		gap: 5px;
	}
	.content {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
</style>
