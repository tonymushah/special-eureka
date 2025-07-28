<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { route } from "$lib/ROUTES";
	import { derived } from "svelte/store";

	const path = derived(page, ($p) => {
		let pathname = $p.url.pathname;
		if (pathname.endsWith("/")) {
			return pathname.substring(0, pathname.length - 1);
		} else {
			return pathname;
		}
	});
	interface Props {
		id: string;
	}

	let { id }: Props = $props();
</script>

<nav>
	<button
		class:active={$path == route("/mangadex/user/[id]", { id })}
		onclick={() => {
			goto(route("/mangadex/user/[id]", { id }));
		}}
	>
		Groups
	</button>
	<button
		class:active={$path == route("/mangadex/user/[id]/uploads", { id })}
		onclick={() => {
			goto(route("/mangadex/user/[id]/uploads", { id }));
		}}
	>
		Uploads
	</button>
	<button
		class:active={$path == route("/mangadex/user/[id]/lists", { id })}
		onclick={() => {
			goto(route("/mangadex/user/[id]/lists", { id }));
		}}
	>
		MDLists
	</button>
</nav>

<style lang="scss">
	button {
		transition: background-color 300ms ease-in-out;
		color: var(--text-color);
		font-family: var(--fonts);
		background-color: var(--accent-l1);
		border: none;
		font-size: 16px;
		padding: 5px 10px;
	}
	button:hover {
		background-color: var(--accent-l1-hover);
	}
	button:active {
		background-color: var(--accent-l1-active);
	}
	button.active {
		font-weight: 800;
		background-color: var(--accent-l3);
	}
	button.active:hover {
		background-color: var(--accent-l3-hover);
	}
	button.active:active {
		background-color: var(--accent-l3-active);
	}
	nav {
		background-color: var(--accent);
		display: flex;
		gap: 10px;
		padding: 5px 10px;
		width: fit-content;
	}
</style>
