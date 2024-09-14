<script lang="ts">
	import { goto } from "$app/navigation";
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import type { ComponentType } from "svelte";

	export let icon: ComponentType;
	export let title: string;
	export let description: string;
	export let href: string;
</script>

<section
	role="button"
	tabindex="0"
	on:keydown={(e) => {
		if (e.key == "Enter") {
			goto(href);
		}
	}}
	on:click={() => goto(href)}
>
	<div class="icon">
		<svelte:component this={icon} />
	</div>
	<Title type={2}>{title}</Title>
	<p>{description}</p>
</section>

<style lang="scss">
	:root {
		--button-dept: 4px;
	}
	p {
		text-align: center;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		background-color: var(--accent-l1);
		border: 3px solid var(--mid-tone);
		padding: 8px;
		transition:
			box-shadow 200ms ease-in-out,
			background-color 200ms ease-in-out,
			transform 200ms ease-in-out;
		box-shadow: 0 var(--button-dept) 0 var(--mid-tone);
	}
	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		transition: color 400ms ease-in-out;
	}
	section:hover {
		background-color: var(--accent-l1-hover);
		.icon {
			color: var(--primary);
		}
	}
	section:active {
		background-color: var(--accent-l1-active);
		box-shadow: 0 0px 0 var(--mid-tone);
		transform: translateY(var(--button-dept));
	}
</style>
