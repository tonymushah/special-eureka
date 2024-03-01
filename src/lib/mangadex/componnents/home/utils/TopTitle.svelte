<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";

	export let label: string;
</script>

<div class="title with-margin">
	<Title>{label}</Title>
	<slot />
</div>

<style lang="scss">
	.with-margin {
		margin-left: 1em;
		margin-right: 1em;
	}
	div.title {
		display: flex;
		align-items: center;
		justify-content: start;
		flex-direction: row;
		gap: 10px;
		z-index: 3;
		position: relative;
	}
</style>
