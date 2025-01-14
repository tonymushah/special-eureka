<script lang="ts">
	import FlagIcon from "@mangadex/componnents/FlagIcon.svelte";
	import MangaDexVarThemeProvider from "@mangadex/componnents/theme/MangaDexVarThemeProvider.svelte";
	import { language_list } from "@mangadex/utils/lang/list";

	import { melt, type AnyMeltElement } from "@melt-ui/svelte";
	import { startCase } from "lodash";
	import type { Readable } from "svelte/store";
	import { slide } from "svelte/transition";
	interface Props {
		menu: AnyMeltElement;
		option: AnyMeltElement;
		isSelected: Readable<(value: unknown) => boolean>;
		open: Readable<boolean>;
	}
	let { open, isSelected, menu, option }: Props = $props();
</script>

{#if $open == true}
	<div class="menu-outer" use:melt={$menu}>
		<MangaDexVarThemeProvider>
			<menu transition:slide={{ duration: 150, axis: "y" }}>
				{#each language_list.map((e) => {
					return { value: e, label: startCase(e) };
				}) as { value, label } (value)}
					<li use:melt={$option({ value, label })} class:isSelected={$isSelected(value)}>
						<div class="icon">
							<FlagIcon lang={value} />
						</div>
						<h4>{label}</h4>
					</li>
				{/each}
			</menu>
		</MangaDexVarThemeProvider>
	</div>
{/if}

<style lang="scss">
	.menu-outer {
		display: flex;
		flex-direction: column;
		max-height: 200px;
	}

	menu {
		margin: 0px;
		border-radius: 0.25em;
		list-style: none;
		background-color: var(--accent);
		z-index: 10;
		overflow-y: scroll;
		color: var(--text-color);
		padding-left: 0em;
		max-height: 300px;
		li {
			padding-left: 1em;
			transition: background-color 200ms ease-in-out;
			display: flex;
			gap: 10px;
			h4 {
				margin: 0px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
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
</style>
