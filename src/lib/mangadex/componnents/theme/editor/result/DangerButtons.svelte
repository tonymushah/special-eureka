<script>
	import DangerButton from "../../buttons/DangerButton.svelte";
</script>

<section class="primaries">
	<DangerButton>
		<div>Default</div>
	</DangerButton>
	<DangerButton variant="1">
		<div>L1</div>
	</DangerButton>
	<DangerButton variant="2">
		<div>L2</div>
	</DangerButton>
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
