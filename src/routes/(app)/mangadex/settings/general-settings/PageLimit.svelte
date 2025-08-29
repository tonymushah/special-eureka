<script lang="ts">
	import FormInput from "@mangadex/componnents/theme/form/input/FormInput.svelte";
	import pageLimit from "@mangadex/stores/page-limit";
</script>

<div>
	<h3>Items per list:</h3>

	<FormInput
		bind:value={$pageLimit}
		inputProps={{
			type: "number"
		}}
	/>
</div>

<span class="note"
	><span class="note-top">Note:</span> If the item per list is > 100, loading a list might be slower.</span
>

<style lang="scss">
	div {
		display: flex;
		gap: 10px;
		align-items: center;
		h3 {
			margin: 0px;
		}
	}
	.note-top {
		text-decoration: underline;
	}
</style>
