<script lang="ts">
	import { isMounted } from "@mangadex/stores/offlineIsMounted";
	import layoutButtonCssMod from "./layout-buttons.module.scss";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { Download } from "@lucide/svelte";
	import { downloadTitlesCustomListsMutation } from "@mangadex/mutations/custom-list/download-titles";
	import { floatingUImenu } from "@mangadex/utils/floating-ui/menu.svelte";
	import MangaDexVarThemeProvider from "@mangadex/componnents/theme/MangaDexVarThemeProvider.svelte";
	import { slide } from "svelte/transition";
	import { MangaDownloadExtras } from "@mangadex/gql/graphql";
	import { addErrorToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import { isLogged } from "@mangadex/utils/auth";
	interface Props {
		listId: string;
	}
	let { listId }: Props = $props();
	let downloadMutation = downloadTitlesCustomListsMutation();
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
		closeOnClick: true,
		closeOnOutClick: true
	});
	let items: {
		mode: MangaDownloadExtras;
		label: string;
		disabled?: boolean;
	}[] = $derived([
		{
			mode: MangaDownloadExtras.AllChapters,
			label: "Download All Chapters"
		},
		{
			mode: MangaDownloadExtras.Failed,
			label: "ReDownload all Failed downloaded Chapters"
		},
		{
			mode: MangaDownloadExtras.UnDownloadeds,
			label: "Download the non downloaded only"
		},
		{
			mode: MangaDownloadExtras.Unreads,
			label: "Download unread chapters",
			disabled: !$isLogged
		},
		{
			mode: MangaDownloadExtras.UnReadUnDownloadeds,
			label: "Download unread non-downloaded chapters",
			disabled: !$isLogged
		},
		{
			mode: MangaDownloadExtras.UnReadFailed,
			label: "Download unread and failed downloaded chapters",
			disabled: !$isLogged
		}
	]);
</script>

<div class="trigger" bind:this={trigger}>
	<ButtonAccent
		isBase
		disabled={$isMounted || downloadMutation.isPending}
		onclick={() => {
			open = !open;
		}}
		variant="2"
	>
		<p class={layoutButtonCssMod.innerButton}>
			{#if downloadMutation.isPending}
				Downloading...
			{:else}
				<Download /> Download titles
			{/if}
		</p>
	</ButtonAccent>
</div>

{#if open}
	<div class="menu-outer" bind:this={menu}>
		<MangaDexVarThemeProvider>
			<menu transition:slide={{ duration: 150, axis: "y" }}>
				{#each items as item}
					<button
						class="li"
						tabindex="0"
						onclick={() => {
							downloadMutation.mutate(
								{
									listIDs: [listId],
									extras: item.mode,
									filter: true
								},
								{
									onError(error) {
										addErrorToast(`Cannot ${item.label}`, error);
									}
								}
							);
						}}
					>
						<h4>{item.label}</h4>
					</button>
				{/each}
			</menu>
		</MangaDexVarThemeProvider>
	</div>
{/if}

<style lang="scss">
	.menu-outer {
		flex-direction: column;
		position: absolute;
		z-index: 10;
	}
	/* .layout {
		flex: 3;
		display: flex;
		flex-direction: column;
		gap: 4px;
	} */
	menu {
		margin: 0px;
		border-radius: 0.25em;
		list-style: none;
		background-color: var(--accent);
		z-index: 10;
		/* overflow-y: scroll; */
		color: var(--text-color);
		padding-left: 0em;
		overflow: hidden;
		.li {
			padding-left: 1em;
			background-color: transparent;
			border: 0px;
			box-shadow: none;
			display: flex;
			gap: 10px;
			font-family: var(--fonts);
			color: var(--text-color);
			text-align: start;
			width: 100%;
			h4 {
				margin: 0px;
				font-weight: 500;
			}
		}
		.li:hover {
			background-color: var(--accent-hover);
		}
		.li:active {
			background-color: var(--accent-active);
		}
	}
</style>
