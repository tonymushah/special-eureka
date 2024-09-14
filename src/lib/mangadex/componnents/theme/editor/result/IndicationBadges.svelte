<script>
	import IndicationButton from "../../buttons/IndicationButton.svelte";
</script>

<section class="buttons">
	<IndicationButton>
		<div>Yeah... this is an indication button</div>
	</IndicationButton>
</section>

<style lang="scss">
	section {
		display: flex;
		gap: 5px;
		flex-wrap: wrap;
		flex-direction: row;
	}
	div {
		--margin-x: 8px;
		--margin-y: 2px;
		margin-top: var(--margin-y);
		margin-bottom: var(--margin-y);
		margin-left: var(--margin-x);
		margin-right: var(--margin-x);
	}
</style>
