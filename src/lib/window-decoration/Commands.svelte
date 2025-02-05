<script>
	import { titleBarButtons } from "./stores/decorations.svelte";
</script>

{#each titleBarButtons.entries() as [key, button] (key)}
	<button class="flex-center" onclick={button.onclick}>
		{button.title}
	</button>
{/each}

<style lang="scss">
	.flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	button {
		background-color: var(--menuBack);
		transition: background-color 300ms ease-in-out;
		color: var(--textColor);
		border: none;
		border-radius: 0.25em;
		font-family: var(--fonts);
		font-weight: 600;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	button:hover {
		background-color: var(--menuBackHover);
	}
	button:active {
		background-color: var(--menuBackActive);
	}
</style>
