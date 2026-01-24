<script lang="ts">
	import FlagIcon from "@mangadex/componnents/FlagIcon.svelte";
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import type { Language } from "@mangadex/gql/graphql";
	import { type Writable } from "svelte/store";
	import LanguagesBaseMenu from "./LanguagesBaseMenu.svelte";
	import { startCase } from "lodash";
	import { floatingUImenu } from "@mangadex/utils/floating-ui/menu.svelte";

	interface Props {
		title: string;
		selecteds: Writable<Language[]>;
		showLangName?: boolean;
		rowLayout?: boolean;
		titleAsParagraph?: boolean;
	}
	let { title, selecteds, showLangName, rowLayout, titleAsParagraph }: Props = $props();
	let open = $state(false);
	let menu = $state<HTMLElement | undefined>();
	let trigger = $state<HTMLElement | undefined>();
	floatingUImenu({
		menuElement: () => menu,
		triggerElement: () => trigger,
		open: () => open,
		setOpen: (o) => (open = o),
		sameWidth: true,
		showMenuDisplay: "flex",
		closeOnClick: true
	});
</script>

<section class="layout" class:rowLayout>
	{#if titleAsParagraph}
		<p class="title">{title}</p>
	{:else}
		<Title type={3}>{title}</Title>
	{/if}
	<div class="content">
		<button
			onclick={() => {
				open = !open;
			}}
			oncontextmenu={(e) => {
				e.preventDefault();
				selecteds.set([]);
			}}
			aria-label={title}
		>
			{#if $selecteds.length > 0}
				{#each $selecteds as s}
					{#if showLangName}
						<div class="lang">
							<div class="icon">
								<FlagIcon lang={s} />
							</div>
							<span>{startCase(s)}</span>
						</div>
					{:else}
						<div class="icon">
							<FlagIcon lang={s} />
						</div>
					{/if}
				{:else}
					Select language
				{/each}
			{:else}
				Select language
			{/if}
		</button>
	</div>
</section>

<LanguagesBaseMenu {open} bind:selectedLanguages={$selecteds} bind:menu />

<style lang="scss">
	button {
		min-width: 15em;
		max-width: 20em;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}
	.layout {
		display: grid;
		gap: 5px;
	}
	.layout.rowLayout {
		display: flex;
		align-items: center;
		gap: 5px;
		flex-direction: row;
	}
	.title {
		margin: 0px;
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
	.lang {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4px;
	}
</style>
