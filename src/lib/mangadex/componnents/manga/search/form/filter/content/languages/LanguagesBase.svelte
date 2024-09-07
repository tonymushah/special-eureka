<script lang="ts">
	import FlagIcon from "@mangadex/componnents/FlagIcon.svelte";
	import MangaDexVarThemeProvider from "@mangadex/componnents/theme/MangaDexVarThemeProvider.svelte";
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import type { Language } from "@mangadex/gql/graphql";
	import { language_list } from "@mangadex/utils/lang/list";
	import { createSelect, melt, type SelectOption } from "@melt-ui/svelte";
	import { startCase } from "lodash";
	import { derived, get, type Writable } from "svelte/store";
	import { slide } from "svelte/transition";

	export let title: string;
	export let selecteds: Writable<Language[]>;
	let selecteds_options = derived(selecteds, ($s) => {
		return $s.map<SelectOption<Language>>((ss) => ({
			value: ss
		}));
	});
	const {
		elements: { trigger, menu, option },
		states: { selected, open },
		helpers: { isSelected }
	} = createSelect<Language, true>({
		forceVisible: true,
		positioning: {
			placement: "bottom",
			fitViewport: true,
			sameWidth: true
		},
		multiple: true,
		selected: {
			subscribe(run, invalidate) {
				return selecteds_options.subscribe(run, invalidate);
			},
			set(value) {
				selecteds.set(value.map((v) => v.value));
			},
			update(updater) {
				const options = get(selecteds_options);
				selecteds.set(updater(options).map((v) => v.value));
			}
		}
	});
</script>

<section class="layout">
	<Title type={3}>{title}</Title>
	<div class="content">
		<button
			use:melt={$trigger}
			on:contextmenu|preventDefault={() => {
				selecteds.set([]);
			}}
		>
			{#if $selected}
				{#each $selected as s}
					<div class="icon">
						<FlagIcon lang={s.value} />
					</div>
				{:else}
					Select language
				{/each}
			{:else}
				Select language
			{/if}
		</button>
	</div>
</section>

{#if $open}
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
	button {
		min-width: 15em;
		max-width: 20em;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}
	.menu-outer {
		display: flex;
		flex-direction: column;
		height: 200px;
	}
	.layout {
		display: flex;
		flex-direction: column;
		gap: 10px;
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
		li {
			padding-left: 1em;
			transition: background-color 200ms ease-in-out;
			h4 {
				margin: 0px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			display: flex;
			gap: 10px;
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
</style>
