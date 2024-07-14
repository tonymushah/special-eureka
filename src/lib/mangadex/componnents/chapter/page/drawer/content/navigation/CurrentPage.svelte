<script lang="ts">
	import SelectPage from "./current-page/SelectPage.svelte";
	import PreviousNext from "./PreviousNext.svelte";
</script>

<div class="layout">
	<div class="content">
		<PreviousNext>
			<SelectPage />
		</PreviousNext>
	</div>
</div>

<style lang="scss">
	.layout {
		display: flex;
		flex-direction: column;
		.content {
			display: flex;
			flex-direction: row;
			gap: 5px;
		}
	}
</style>
