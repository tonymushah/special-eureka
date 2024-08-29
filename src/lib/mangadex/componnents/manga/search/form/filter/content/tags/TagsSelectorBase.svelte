<script lang="ts">
	import type { TagGroup } from "@mangadex/gql/graphql";
	import {
		getMangaSearchTagOptionsContextStoreWritable,
		groupTagOption,
		toggleTagOption,
		TagOptionState
	} from "../../contexts/tags";
	import { derived, readonly } from "svelte/store";
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import { PlusIcon, MinusIcon } from "svelte-feather-icons";
	import make_first_upper_case from "@mangadex/utils/make_first_upper_case";

	export let title: string;
	export let group: TagGroup;
	const options = getMangaSearchTagOptionsContextStoreWritable();
	const grouped = groupTagOption(readonly(options), group);
	function toggle(id: string, inverted?: boolean) {
		options.update((opts) => {
			toggleTagOption(opts, id, inverted);
			return opts;
		});
	}
	const isGroupedEmpty = derived(grouped, ($grouped) => $grouped.length == 0);
</script>

{#if !$isGroupedEmpty}
	<section class="layout">
		<Title type={3}>{title}</Title>
		<div class="content">
			{#each $grouped as tag}
				<button
					class:included={tag.state == TagOptionState.INCLUDE}
					class:excluded={tag.state == TagOptionState.EXCLUDE}
					on:click={() => toggle(tag.id)}
					on:contextmenu|preventDefault={() => toggle(tag.id, true)}
				>
					{#if tag.state != TagOptionState.NONE}
						<div class="icon">
							{#if tag.state == TagOptionState.EXCLUDE}
								<MinusIcon />
							{:else if tag.state == TagOptionState.INCLUDE}
								<PlusIcon />
							{/if}
						</div>
					{/if}

					{make_first_upper_case(tag.name)}
				</button>
			{/each}
		</div>
	</section>
{/if}

<style lang="scss">
	.layout {
		display: grid;
		gap: 5px;
	}
	.content {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	button {
		display: flex;
		flex-direction: row;
		gap: 5px;
		padding: 5px;
		transition: background-color 200ms ease-in-out;
		background-color: var(--accent-l1);
		color: var(--text-color);
		font-size: var(--font-size);
		font-family: var(--fonts);
		border: none;
		border-radius: 0.25em;
	}
	button:hover {
		background-color: var(--accent-l1-hover);
	}
	button:active {
		background-color: var(--accent-l1-active);
	}
	button.included {
		background-color: var(--status-green);
	}
	button.included:hover {
		background-color: color-mix(in srgb, var(--status-green) 50%, var(--accent-l1-hover) 50%);
	}
	button.included:active {
		background-color: color-mix(in srgb, var(--status-green) 50%, var(--accent-l1-active) 50%);
	}
	button.excluded {
		background-color: var(--status-red);
	}
	button.excluded:hover {
		background-color: color-mix(in srgb, var(--status-red) 50%, var(--accent-l1-hover) 50%);
	}
	button.excluded:active {
		background-color: color-mix(in srgb, var(--status-red) 50%, var(--accent-l1-active) 50%);
	}
</style>
