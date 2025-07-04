<script lang="ts" module>
	const sortsData: Record<string, Order> = {
		"Chapter Ascending": {
			chapter: OrderDirection.Ascending
		},
		"Chapter Descending": {
			chapter: OrderDirection.Descending
		},
		"Created At Ascending": {
			createdAt: OrderDirection.Ascending
		},
		"Created At Descending": {
			createdAt: OrderDirection.Descending
		},
		"Publish At Ascending": {
			publishAt: OrderDirection.Ascending
		},
		"Publish At Descending": {
			publishAt: OrderDirection.Descending
		},
		"Readable At Ascending": {
			readableAt: OrderDirection.Ascending
		},
		"Readable At Descending": {
			readableAt: OrderDirection.Descending
		},
		"Updated At Ascending": {
			updatedAt: OrderDirection.Ascending
		},
		"Updated At Descending": {
			updatedAt: OrderDirection.Descending
		},
		"Volume Ascending": {
			volume: OrderDirection.Ascending
		},
		"Volume Descending": {
			volume: OrderDirection.Descending
		}
	};
	const sortDataReversed = new Map(Object.entries(sortsData).map(([key, value]) => [value, key]));
</script>

<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import MangaDexVarThemeProvider from "@mangadex/componnents/theme/MangaDexVarThemeProvider.svelte";

	import { OrderDirection, type ChapterSortOrder as Order } from "@mangadex/gql/graphql";
	import { createCombobox, melt } from "@melt-ui/svelte";
	import { derived as der, type Writable } from "svelte/store";
	import { slide } from "svelte/transition";

	interface Props {
		sort: Writable<Order | undefined>;
	}
	let { sort }: Props = $props();
	const currentSortText = der(sort, ($sort) => {
		if (!$sort) {
			return "None";
		} else {
			return sortDataReversed.get($sort) ?? "Undefined";
		}
	});
	const {
		elements: { menu, input: trigger, option, group, groupLabel },
		states: { open }
	} = createCombobox<Order | undefined>({
		forceVisible: true,
		positioning: {
			placement: "bottom",
			fitViewport: true,
			sameWidth: true
		}
	});
</script>

<div class="layout">
	<div class="input" use:melt={$trigger}>
		<ButtonAccent>
			{$currentSortText}
		</ButtonAccent>
	</div>
</div>

{#if $open}
	<div class="menu-outer" use:melt={$menu}>
		<MangaDexVarThemeProvider>
			<menu transition:slide={{ duration: 150, axis: "y" }}>
				<!-- svelte-ignore event_directive_deprecated -->
				<li
					use:melt={$option({
						value: undefined,
						label: "None"
					})}
					on:m-click={() => {
						sort.set(undefined);
					}}
				>
					<h4>None</h4>
				</li>
				{#each Object.entries(sortsData) as [text, value]}
					<!-- svelte-ignore event_directive_deprecated -->
					<li
						use:melt={$option({
							value,
							label: text
						})}
						on:m-click={() => {
							sort.set(value);
						}}
					>
						<h4>{text}</h4>
					</li>
				{/each}
			</menu>
		</MangaDexVarThemeProvider>
	</div>
{/if}

<style lang="scss">
	.label {
		padding: 0em 0.5em;
		color: var(--mid-tone);
		display: flex;
		gap: 2px;
		align-items: center;
		font-size: 12px;
		font-family: inherit;
		font-weight: 800;
	}
	.menu-outer {
		display: flex;
		flex-direction: column;
		height: 200px;
	}
	.layout {
		flex: 3;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	menu {
		margin: 0px;
		border-radius: 0.25em;

		background-color: var(--accent);
		z-index: 10;
		overflow-y: scroll;
		color: var(--text-color);
		padding-left: 0em;
		li {
			transition: background-color 200ms ease-in-out;
			h4 {
				padding-left: 0.5em;
				margin: 0px;
				font-size: 14px;
			}
		}
		li:not(.isSelected):hover {
			background-color: var(--accent-hover);
		}
		li:not(.isSelected):active {
			background-color: var(--accent-active);
		}
		li.isSelected {
			background-color: var(--primary);
		}
	}
	.input {
		display: grid;
	}
</style>
