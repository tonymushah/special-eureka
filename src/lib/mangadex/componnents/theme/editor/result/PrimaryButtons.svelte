<script>
	import PrimaryButton from "../../buttons/PrimaryButton.svelte";
</script>

<section class="primaries">
	<PrimaryButton>
		<div>Default</div>
	</PrimaryButton>
	<PrimaryButton variant="1">
		<div>L1</div>
	</PrimaryButton>
	<PrimaryButton variant="2">
		<div>L2</div>
	</PrimaryButton>
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
