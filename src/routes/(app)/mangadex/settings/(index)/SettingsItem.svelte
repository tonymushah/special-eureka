<script lang="ts">
	import { goto } from "$app/navigation";
	import type { Component } from "svelte";

	interface Props {
		icon: Component;
		title: string;
		description: string;
		href: string;
	}

	let { icon, title, description, href }: Props = $props();

	const SvelteComponent = $derived(icon);
</script>

<button onclick={() => goto(href)}>
	<div class="icon">
		{#if SvelteComponent}
			<SvelteComponent />
		{/if}
	</div>
	<h2>{title}</h2>
	<p>{description}</p>
</button>

<style lang="scss">
	:root {
		--button-dept: 5px;
	}
	p {
		text-align: center;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	h2 {
		text-align: center;
		display: -webkit-box;
		text-wrap: wrap;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		overflow: hidden;
		margin: 0px;
		width: 100%;
		font-family: var(--fonts);
		font-size: var(--text-heading-sm);
	}
	button {
		--border-shadows-color: var(--mid-tone);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-lg);
		background-color: var(--accent-l1);
		border: 3px solid var(--border-shadows-color);
		padding: var(--space-md);
		transition:
			box-shadow 10ms ease-in-out,
			background-color 10ms ease-in-out,
			transform 10ms ease-in-out;
		box-shadow: 0 var(--button-dept) 0 var(--border-shadows-color);
		font-family: var(--fonts);
		color: var(--text-color);
		font-size: inherit;
	}
	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		transition: color 50ms ease-in-out;
	}
	button:hover {
		background-color: var(--accent-l1-hover);
		.icon {
			color: var(--primary);
		}
	}
	button:active {
		background-color: var(--accent-l1-active);
		box-shadow: none;
		transform: translateY(var(--button-dept));
	}
	button:focus {
		--border-shadows-color: var(--contrast-l1);
		outline: none;
	}
</style>
