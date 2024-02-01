<script>
	import { route } from "$lib/ROUTES";
</script>

<div>
	<h1>Welcome to SvelteKit</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
	<p><a href={route("/mangadex")}>Mangadex Home</a></p>
</div>

<style lang="less">
    div {
        margin: 8px;
    }
</style>