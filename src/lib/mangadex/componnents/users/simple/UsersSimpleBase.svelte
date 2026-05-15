<script lang="ts">
	import { camelCase } from "es-toolkit/compat";
	import BeeDexRaw from "@mangadex/assets/Bee Dex Raw.jpg";
	import MangaDexUserSvg from "@mangadex/assets/artworks/user.png";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { dev } from "$app/environment";

	interface Props extends HTMLButtonAttributes {
		profilePicture?: string;
		name: string;
		_this?: HTMLButtonElement | undefined;
		selectable?: boolean;
	}

	let {
		profilePicture = dev ? BeeDexRaw : MangaDexUserSvg,
		name,
		_this = $bindable(undefined),
		children,
		selectable,
		...restProps
	}: Props = $props();
</script>

<button
	bind:this={_this}
	{...restProps}
	class:users-simple-selectable={selectable}
>
	<img alt="{camelCase(name)}-profile-picture" src={profilePicture} />
	<p>{name}</p>
	<div class="right">
		{@render children?.()}
	</div>
</button>

<style lang="scss">
	:root {
		--outer-border: 4px;
	}
	img {
		border-radius: 100vh;
		aspect-ratio: 1/1;
		width: 3.5em;
	}
	p {
		font-size: 1.25em;
		margin: 0px;
	}
	button {
		--shadows-border: var(--mid-tone);
		padding: var(--space-xs) var(--space-sm);
		padding-right: var(--space-md);
		display: flex;
		gap: var(--space-sm);
		align-items: center;
		background-color: var(--accent);
		color: var(--text-color);
		font-family: var(--fonts);
		border-radius: var(--radius-sm);
		border-color: var(--shadows-border);
		border-style: solid;
		border-width: 3px;
		box-shadow: 0px var(--outer-border) 0px var(--shadows-border);
	}
	button:hover {
		background-color: var(--accent-hover);
		cursor: pointer;
	}
	button:focus {
		outline: none;
		--shadows-border: var(--contrast-l1);
	}
	button:active {
		background-color: var(--accent-active);
		box-shadow: none;
		transform: translateY(var(--outer-border));
	}
	.right {
		justify-content: end;
	}
	.users-simple-selectable:global([data-selecto-selected]) {
		background-color: var(--accent-l1);
		border-color: var(--primary-l2);
	}
</style>
