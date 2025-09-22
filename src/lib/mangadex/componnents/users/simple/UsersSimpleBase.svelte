<script lang="ts">
	import { emptyMeltElement, melt, type AnyMeltElement } from "@melt-ui/svelte";
	import { camelCase } from "lodash";
	import BeeDexRaw from "@mangadex/assets/Bee Dex Raw.jpg";
	import MangaDexUserSvg from "@mangadex/assets/artworks/user.png";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { dev } from "$app/environment";

	interface Props extends HTMLButtonAttributes {
		profilePicture?: string;
		name: string;
		element?: AnyMeltElement;
		_this?: HTMLButtonElement | undefined;
	}

	let {
		profilePicture = dev ? BeeDexRaw : MangaDexUserSvg,
		name,
		element = emptyMeltElement,
		_this = $bindable(undefined),
		children,
		...restProps
	}: Props = $props();
</script>

<button bind:this={_this} use:melt={$element} {...restProps}>
	<img alt="{camelCase(name)}-profile-picture" src={profilePicture} />
	<p>{name}</p>
	<div class="right">
		{@render children?.()}
	</div>
</button>

<style lang="scss">
	:root {
		--outer-border: 3px;
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
		padding: 0.5em 0.25em;
		padding-right: 1em;
		display: flex;
		gap: 0.5em;
		align-items: center;
		background-color: var(--accent);
		transition:
			(box-shadow, transform) 100ms ease-in-out,
			background-color 200ms ease-in-out;
		color: var(--text-color);
		font-family: var(--fonts);
		border-radius: 8px;
		border-color: var(--mid-tone);
		border-style: solid;
		border-width: var(--outer-border);
		box-shadow: 0px var(--outer-border) 0px var(--mid-tone);
	}
	button:hover {
		background-color: var(--accent-hover);
	}
	button:active {
		background-color: var(--accent-active);
		box-shadow: none;
		transform: translateY(var(--outer-border));
	}
	.right {
		justify-content: end;
	}
</style>
