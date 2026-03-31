<script lang="ts">
	import FlagIcon from "@mangadex/componnents/FlagIcon.svelte";
	import MangaDexVarThemeProvider from "@mangadex/componnents/theme/MangaDexVarThemeProvider.svelte";
	import type { Language } from "@mangadex/gql/graphql";
	import { language_list } from "@mangadex/utils/lang/list";
	import { startCase } from "lodash";
	interface Props {
		menu?: HTMLElement;
		open: boolean;
		selectedLanguages?: Language[];
	}
	let { open, selectedLanguages = $bindable([]), menu = $bindable() }: Props = $props();
</script>

{#if open == true}
	<div class="menu-outer" bind:this={menu}>
		<MangaDexVarThemeProvider>
			<menu>
				{#each language_list.map((e) => {
					return { value: e, label: startCase(e) };
				}) as { value, label } (value)}
					<button
						class="mi"
						onclick={() => {
							if (selectedLanguages.includes(value)) {
								selectedLanguages = selectedLanguages.filter((t) => t != value);
							} else {
								selectedLanguages = new Set([...selectedLanguages, value]).values().toArray();
							}
						}}
						class:isSelected={selectedLanguages.includes(value)}
					>
						<div class="icon">
							<FlagIcon lang={value} />
						</div>
						<h4>{label}</h4>
					</button>
				{/each}
			</menu>
		</MangaDexVarThemeProvider>
	</div>
{/if}

<style lang="scss">
	.menu-outer {
		display: none;
		flex-direction: column;
		max-height: 200px;
		position: absolute;
	}

	menu {
		margin: 0px;
		border-radius: 0.25em;
		list-style: none;
		background-color: var(--accent);
		z-index: 10;
		overflow-y: scroll;
		overflow-x: hidden;
		color: var(--text-color);
		padding-left: 0em;
		max-height: 300px;
		.mi {
			padding-left: 1em;
			transition: background-color 50ms ease-in-out;
			display: flex;
			gap: 10px;
			background-color: transparent;
			color: var(--text-color);
			border: 0px;
			box-shadow: none;
			width: 100%;
			font-family: var(--fonts);
			h4 {
				margin: 0px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
		.mi:not(.isSelected):hover {
			background-color: var(--accent-hover);
		}
		.mi:not(.isSelected):active {
			background-color: var(--accent-active);
		}
		.mi.isSelected {
			background-color: var(--primary);
		}
	}
</style>
