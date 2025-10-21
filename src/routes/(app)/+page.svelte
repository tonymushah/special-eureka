<script lang="ts">
	import { route } from "$lib/ROUTES";
	import isDefaultDecoration from "$lib/core/window-decoration/stores/isDefaultDecoration";
	import { fonts, setDefault } from "$lib/core/window-decoration/WindowDecoration.svelte";
	import { onMount } from "svelte";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	import { dev } from "$app/environment";
	import { goto } from "$app/navigation";
	onMount(() => {
		setDefault();
		if (!dev) {
			goto(route("/dashboard"));
		}
	});
</script>

<AppTitle title="Welcome to Special Eureka" />

<main class:isDefaultDecoration={$isDefaultDecoration}>
	<div class="top" style="--fonts: {$fonts}">
		<h1>Welcome to Special Eureka</h1>
		{#if dev}
			<div class="alert">
				<h2>If you see this page, means that you're in a prerealease version</h2>
				<p>A lot of thing can be improved, so please be patient and wait for the stable realease</p>
			</div>
			<div class="links">
				<p><a href={route("/mangadex")}>Mangadex Home</a></p>
				<p><a href={route("/dashboard")}>Dashboard</a></p>
				<p><a href={route("/grid-test")}>Grid test</a></p>
			</div>
		{:else}
			<div class="loadign">
				<h2>Loading...</h2>
			</div>
		{/if}
	</div>
</main>

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
	.loadign {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 200px;
		height: 150px;
		border: 3px dashed black;
		align-self: center;
	}
	main {
		height: -webkit-fill-available;
	}
	main.isDefaultDecoration {
		height: 100cqh;
	}
</style>
