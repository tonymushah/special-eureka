<script lang="ts">
	import FlagIcon from "@mangadex/componnents/FlagIcon.svelte";
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import type { Language } from "@mangadex/gql/graphql";
	import { createSelect, melt, type SelectOption } from "@melt-ui/svelte";
	import { derived as der, get, type Writable } from "svelte/store";
	import LanguagesBaseMenu from "./LanguagesBaseMenu.svelte";
	import type { PortalConfig } from "@melt-ui/svelte/internal/actions";

	interface Props {
		title: string;
		selecteds: Writable<Language[]>;
		placement?:
			| "top"
			| "top-start"
			| "top-end"
			| "right"
			| "right-start"
			| "right-end"
			| "bottom"
			| "bottom-start"
			| "bottom-end"
			| "left"
			| "left-start"
			| "left-end";
		portal?: PortalConfig | null;
	}
	let { title, selecteds, placement = "top", portal }: Props = $props();
	const selecteds_options = der(selecteds, ($s) => {
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
			placement,
			fitViewport: true,
			sameWidth: true
			// strategy: "fixed"
		},
		portal,
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
	$effect(() => {
		if ($open) {
			console.log("open");
		} else {
			console.log("not open");
		}
	});
</script>

<section class="layout">
	<Title type={3}>{title}</Title>
	<div class="content">
		<button
			use:melt={$trigger}
			oncontextmenu={(e) => {
				e.preventDefault();
				selecteds.set([]);
			}}
			aria-label={title}
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

<!-- @ts-ignore -->
<LanguagesBaseMenu {open} {menu} {option} {isSelected} />

<style lang="scss">
	button {
		min-width: 15em;
		max-width: 20em;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}
	.layout {
		display: flex;
		flex-direction: column;
		gap: 10px;
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
