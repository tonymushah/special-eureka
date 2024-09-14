<script>
	import ButtonAccent from "../../buttons/ButtonAccent.svelte";
</script>

<section class="accents">
	<ButtonAccent>
		<div>Default</div>
	</ButtonAccent>
	<ButtonAccent variant="1">
		<div>L1</div>
	</ButtonAccent>
	<ButtonAccent variant="2">
		<div>L2</div>
	</ButtonAccent>
	<ButtonAccent variant="3">
		<div>L3</div>
	</ButtonAccent>
	<ButtonAccent variant="4">
		<div>L4</div>
	</ButtonAccent>
	<ButtonAccent variant="5">
		<div>L5</div>
	</ButtonAccent>
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
