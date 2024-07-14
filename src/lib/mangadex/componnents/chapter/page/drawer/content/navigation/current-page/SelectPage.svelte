<script lang="ts">
	import { getChapterCurrentPageContext } from "@mangadex/componnents/chapter/page/contexts/currentPage";
	import { getChapterImageContext } from "@mangadex/componnents/chapter/page/contexts/images";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import MangaDexVarThemeProvider from "@mangadex/componnents/theme/MangaDexVarThemeProvider.svelte";
	import { createSelect, melt, type SelectOption } from "@melt-ui/svelte";
	import { times } from "lodash";
	import { derived, get } from "svelte/store";
	import { fade, slide } from "svelte/transition";

	type Page = {
		index: number;
	};
	const currentPageContext = getChapterCurrentPageContext();
	const currentPageSelectedReadable = derived(currentPageContext, ($page) => {
		return {
			value: $page,
			label: `${$page + 1}`
		} as SelectOption<number>;
	});
	const options = derived(getChapterImageContext(), ($images) =>
		times($images.length).map<SelectOption<number>>((index) => ({
			value: index,
			label: `${index + 1}`
		}))
	);
	const {
		elements: { trigger, menu, option, group, groupLabel, label },
		states: { selectedLabel, open },
		helpers: { isSelected }
	} = createSelect<number>({
		forceVisible: true,
		positioning: {
			placement: "bottom",
			fitViewport: true,
			sameWidth: true
		},
		selected: {
			subscribe(run, invalidate) {
				return currentPageSelectedReadable.subscribe(run, invalidate);
			},
			set(value) {
				currentPageContext.set(value.value);
			},
			update(updater) {
				currentPageContext.set(updater(get(currentPageSelectedReadable)).value);
			}
		}
	});
</script>

<div class="layout">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label use:melt={$label}> Choose page: </label>
	<div class="input" use:melt={$trigger}>
		<ButtonAccent>
			{$selectedLabel}
		</ButtonAccent>
	</div>
</div>

{#if $open}
	<div class="menu-outer" use:melt={$menu}>
		<MangaDexVarThemeProvider>
			<menu transition:slide={{ duration: 150, axis: "y" }}>
				{#each $options as { value, label }}
					<li use:melt={$option({ value, label })}>
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
		height: 200px;
	}
	.layout {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	menu {
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
			}
		}
		li:hover {
			background-color: var(--accent-hover);
		}
		li:active {
			background-color: var(--accent-active);
		}
	}
	label {
		font-size: 14px;
	}
	.input {
		display: grid;
	}
</style>
