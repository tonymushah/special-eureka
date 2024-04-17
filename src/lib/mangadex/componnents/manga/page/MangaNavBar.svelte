<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { route } from "$lib/ROUTES";
	import { createEventDispatcher } from "svelte";
	import { derived } from "svelte/store";

	const path = derived(page, ($p) => {
		let pathname = $p.url.pathname;
		if (pathname.endsWith("/")) {
			return pathname.substring(0, pathname.length - 1);
		} else {
			return pathname;
		}
	});
	export let id: string;
	export let hasRelation = false;
	const dispatch = createEventDispatcher<{
		comment: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	export let comments: number | undefined = undefined;
</script>

<nav>
	<button
		class:active={$path == route("/mangadex/title/[id]", { id })}
		on:click={() => {
			goto(route("/mangadex/title/[id]", { id }));
		}}
	>
		Chapters
	</button>
	<button
		on:click={(e) => {
			dispatch("comment", e);
		}}
	>
		Comments {#if comments}
			({comments})
		{/if}
	</button>
	<button
		class:active={$path == route("/mangadex/title/[id]/covers", { id })}
		on:click={() => {
			goto(route("/mangadex/title/[id]/covers", { id }));
		}}
	>
		Art
	</button>
	{#if hasRelation}
		<button
			class:active={$path == route("/mangadex/title/[id]/related", { id })}
			on:click={() => {
				goto(route("/mangadex/title/[id]/related", { id }));
			}}
		>
			Related
		</button>
	{/if}
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
