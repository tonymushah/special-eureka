<script>
	import Spinner from "@mangadex/componnents/theme/loader/Spinner.svelte";
</script>

<div class="loader with-margin">
	<Spinner />
</div>

<style lang="scss">
	div.loader {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: var(--height);
	}
</style>
