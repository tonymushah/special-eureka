<script lang="ts">
	import { getRelatedChapters, hasRelatedChapters } from "../../../../contexts/relatedChapters";
	import MangaDexVarThemeProvider from "@mangadex/componnents/theme/MangaDexVarThemeProvider.svelte";
	import { getCurrentChapterData } from "../../../../contexts/currentChapter";
	import { slide } from "svelte/transition";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { fireSelectChapterEvent } from "../../../../contexts/previousNextEventTarget";
	import { groupBy, reverse, upperCase } from "lodash";
	import { floatingUImenu } from "@mangadex/utils/floating-ui/menu.svelte";
	const hasRelated = hasRelatedChapters();
	type OptionsMap = {
		label: string;
		id: string;
		volume: string;
	};
	const related = getRelatedChapters();
	let options = $derived(
		groupBy(
			$related.map<OptionsMap>(({ chapter, volume, id }) => {
				let label: string;
				if (chapter != undefined) {
					if (chapter == "none" || chapter.length == 0) {
						label = "No label??";
					} else {
						label = `Chapter ${chapter}`;
					}
				} else {
					label = "No label??";
				}
				return {
					id,
					label,
					volume: volume ?? "none"
				};
			}),
			"volume"
		)
	);
	const current = getCurrentChapterData();
	const isSelected = (value: string) => $current.id == value;

	let menu_options = $derived(reverse(Object.entries(options)));
	let open = $state(false);
	let trigger = $state<HTMLElement | undefined>();
	let menu = $state<HTMLElement | undefined>();
	floatingUImenu({
		open: () => open,
		triggerElement: () => trigger,
		menuElement: () => menu,
		showMenuDisplay: "flex",
		setOpen: (o) => (open = o),
		sameWidth: true,
		closeOnClick: true
	});
</script>

<div class="layout">
	<div class="input" bind:this={trigger}>
		<ButtonAccent disabled={$hasRelated}>
			{#if $current.chapterNumber != undefined}
				Chapter {$current.chapterNumber}
			{:else if $current.isOneshot}
				Oneshot
			{:else}
				??
			{/if}
		</ButtonAccent>
	</div>
</div>

{#if open}
	<div class="menu-outer" bind:this={menu}>
		<MangaDexVarThemeProvider>
			<menu transition:slide={{ duration: 150, axis: "y" }}>
				{#each menu_options as [volume, chapters]}
					<section>
						<div class="label">
							<span>
								Volume {upperCase(volume)}
							</span>
							<hr />
						</div>
						{#each chapters as chapter}
							<button
								class="li"
								onclick={() => {
									fireSelectChapterEvent(chapter.id);
								}}
								class:isSelected={isSelected(chapter.id)}
							>
								<h4>{chapter.label}</h4>
							</button>
						{/each}
					</section>
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
		hr {
			flex-grow: 1;
			height: 1px;
			background-color: var(--mid-tone);
			border: none;
		}
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
		section {
			list-style: none;
			.li {
				transition: background-color 200ms ease-in-out;
				background: transparent;
				border: 0px;
				font-family: var(--fonts);
				h4 {
					padding-left: 0.5em;
					margin: 0px;
					font-size: 14px;
				}
			}
			.li:not(.isSelected):hover {
				background-color: var(--accent-hover);
			}
			.li:not(.isSelected):active {
				background-color: var(--accent-active);
			}
			.li.isSelected {
				background-color: var(--primary);
			}
		}
	}
	.input {
		display: grid;
	}
</style>
