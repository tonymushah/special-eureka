<script lang="ts">
	import { route } from "$lib/ROUTES";
	import { fonts, setDefault } from "$lib/window-decoration/WindowDecoration.svelte";
	import { onMount } from "svelte";
	onMount(() => {
		setDefault();
	});
</script>

<div class="top" style="--fonts: {$fonts}">
	<h1>Welcome to Special Eureka</h1>
	<div class="alert">
		<h2>If you see this page, means that you're in a prerealease version</h2>
		<p>A lot of thing can be improved, so please be patient and wait for the stable realease</p>
	</div>
	<div class="links">
		<p><a href={route("/mangadex")}>Mangadex Home</a></p>
		<p><a href={route("/grid-test")}>Grid test</a></p>
	</div>
</div>

<style lang="scss">
	div.top {
		font-family: var(--fonts);
		display: flex;
		align-content: center;
		justify-content: center;
		flex-direction: column;
		flex-wrap: wrap;
		width: 100vw;
		height: -webkit-fill-available;
		text-align: center;
		.alert {
			display: flex;
			background-color: #ffb9b9;
			flex-direction: column;
			border-radius: 0.25em;
			padding: 5px;
			h2 {
				margin: 5px 0px;
			}
		}
	}
</style>
