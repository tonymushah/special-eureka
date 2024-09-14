<script>
	import ButtonAccent from "../../buttons/ButtonAccent.svelte";
</script>

<section class="buttons">
	<ButtonAccent variant="accent">
		<div>Default</div>
	</ButtonAccent>
	<ButtonAccent variant="accent-alt">
		<div>Alternate</div>
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
