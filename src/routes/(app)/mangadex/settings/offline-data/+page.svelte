<script lang="ts">
	import ErrorComponent from "@mangadex/componnents/ErrorComponent.svelte";
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import WarningComponent from "@mangadex/componnents/WarningComponent.svelte";
	import { mutationStore, queryStore as queryStoreLoader } from "@mangadex/stores/offlineConfig";
	import { isMounted } from "@mangadex/stores/offlineIsMounted";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	import { open as dialogOpen } from "@tauri-apps/plugin-dialog";
	import { revealItemInDir } from "@tauri-apps/plugin-opener";
	import { slide } from "svelte/transition";
	import { v4 } from "uuid";

	let queryStore = queryStoreLoader();
	let dataDir = $derived(queryStore.data?.userOption.getOfflineConfig.dataDir);
	let chaptersDir = $derived(queryStore.data?.userOption.getOfflineConfig.chaptersDir);
	let coversDir = $derived(queryStore.data?.userOption.getOfflineConfig.coversDir);
	let mangasDir = $derived(queryStore.data?.userOption.getOfflineConfig.mangasDir);

	async function setupDataDir(dir: string) {
		return await mutationStore.mutateAsync({
			dataDirectory: dir
		});
	}
	async function setupChapters(dir: string) {
		const dataDirectory = dataDir;
		if (dataDirectory) {
			return await mutationStore.mutateAsync({
				dataDirectory,
				chaptersDirectory: dir
			});
		}
	}
	async function setupCovers(dir: string) {
		const dataDirectory = dataDir;
		if (dataDirectory) {
			return await mutationStore.mutateAsync({
				dataDirectory,
				coversDirectory: dir
			});
		}
	}
	async function setupMangasDir(dir: string) {
		const dataDirectory = dataDir;
		if (dataDirectory) {
			return await mutationStore.mutateAsync({
				dataDirectory,
				mangasDirectory: dir
			});
		}
	}
	let disabled = $derived(isMounted || mutationStore.isPending);
</script>

<h1>Offline Data Config</h1>

<AppTitle title="Offline Data Config - MangaDex" />

{#if mutationStore.error}
	<ErrorComponent error={mutationStore.error} label="Error on updating config" />
{/if}

{#if queryStore.error}
	<ErrorComponent
		error={queryStore.error}
		label="Error on fetching config"
		retry={() => {
			queryStore.refetch();
		}}
	/>
{/if}

{#if $isMounted}
	<div
		transition:slide={{
			axis: "y"
		}}
	>
		<WarningComponent
			label="The offline data is mounted"
			message="Please disable it to update the directories path"
		/>
	</div>
{/if}

<section>
	<p>
		Data directory: <a
			class="dir-info"
			class:disabled={$disabled}
			onclick={() => {
				if (dataDir) {
					revealItemInDir(dataDir).catch(console.warn);
				}
			}}
			href={`#${v4()}`}>{dataDir}</a
		>
	</p>
	<ButtonAccentOnlyLabel
		disabled={$disabled}
		label="Select data directory"
		onclick={async () => {
			const dir = await dialogOpen({
				directory: true,
				title: "Select offline data directory",
				multiple: false
			});
			if (dir) {
				setupDataDir(dir);
			}
		}}
		variant="5"
	/>
</section>

<section>
	<p>
		Titles/mangas directory: <a
			class="dir-info"
			class:disabled={$disabled}
			onclick={() => {
				if (mangasDir) {
					revealItemInDir(mangasDir);
				}
			}}
			href={`#${v4()}`}>{mangasDir}</a
		>
	</p>
	<ButtonAccentOnlyLabel
		disabled={$disabled}
		label="Select titles directory"
		onclick={async () => {
			const dir = await dialogOpen({
				directory: true,
				title: "Select offline titles directory",
				multiple: false,
				defaultPath: dataDir
			});
			if (dir) {
				setupMangasDir(dir);
			}
		}}
		variant="5"
	/>
</section>

<section>
	<p>
		Chapters directory: <a
			class="dir-info"
			class:disabled={$disabled}
			onclick={() => {
				if (chaptersDir) {
					revealItemInDir(chaptersDir);
				}
			}}
			href={`#${v4()}`}>{chaptersDir}</a
		>
	</p>
	<ButtonAccentOnlyLabel
		disabled={$disabled}
		label="Select chapters directory"
		onclick={async () => {
			const dir = await dialogOpen({
				directory: true,
				title: "Select offline chapters directory",
				multiple: false,
				defaultPath: dataDir
			});
			if (dir) {
				setupChapters(dir);
			}
		}}
		variant="5"
	/>
</section>

<section>
	<p>
		Covers directory: <a
			class="dir-info"
			class:disabled={$disabled}
			onclick={() => {
				if (coversDir) {
					revealItemInDir(coversDir);
				}
			}}
			href={`#${v4()}`}>{coversDir}</a
		>
	</p>
	<ButtonAccentOnlyLabel
		disabled={$disabled}
		label="Select covers directory"
		onclick={async () => {
			const dir = await dialogOpen({
				directory: true,
				title: "Select offline covers directory",
				multiple: false
			});
			if (dir) {
				setupCovers(dir);
			}
		}}
		variant="5"
	/>
</section>

<style lang="scss">
	a.dir-info {
		color: color-mix(in srgb, var(--text-color) 50%, var(--primary-l1) 50%);
	}
	a.dir-info:not(:hover) {
		text-decoration: none;
	}
	a.dir-info:hover {
		text-decoration: underline;
	}
	a.dir-info.disabled {
		color: color-mix(in srgb, var(--text-color) 50%, var(--primary-l2) 50%);
	}
</style>
