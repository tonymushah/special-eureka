<script lang="ts">
	import SelectPage from "./current-page/SelectPage.svelte";
	import PreviousNext from "./PreviousNext.svelte";
</script>

<div class="layout">
	<PreviousNext>
		<SelectPage />
	</PreviousNext>
</div>

<style lang="scss">
	.layout {
		display: flex;
		flex-direction: row;
		gap: 2px;
	}
</style>
