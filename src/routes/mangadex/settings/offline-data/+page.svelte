<script lang="ts">
	import ErrorComponent from "@mangadex/componnents/ErrorComponent.svelte";
	import HomeErrorComponnent from "@mangadex/componnents/home/utils/HomeErrorComponnent.svelte";
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import WarningComponent from "@mangadex/componnents/WarningComponent.svelte";
	import { mutationStore, queryStore } from "@mangadex/stores/offlineConfig";
	import { isMounted } from "@mangadex/stores/offlineIsMounted";
	import { open as dialogOpen } from "@tauri-apps/plugin-dialog";
	import { openPath } from "@tauri-apps/plugin-opener";
	import { derived, get } from "svelte/store";
	import { v4 } from "uuid";
	const dataDir = derived(queryStore, (qS) => qS.data?.userOption.getOfflineConfig.dataDir);
	const chaptersDir = derived(
		queryStore,
		(qS) => qS.data?.userOption.getOfflineConfig.chaptersDir
	);
	const coversDir = derived(queryStore, (qS) => qS.data?.userOption.getOfflineConfig.coversDir);
	const mangasDir = derived(queryStore, (qS) => qS.data?.userOption.getOfflineConfig.mangasDir);

	async function setupDataDir(dir: string) {
		return await get(mutationStore).mutateAsync({
			dataDirectory: dir
		});
	}
	async function setupChapters(dir: string) {
		const dataDirectory = get(dataDir);
		if (dataDirectory) {
			return await get(mutationStore).mutateAsync({
				dataDirectory,
				chaptersDirectory: dir
			});
		}
	}
	async function setupCovers(dir: string) {
		const dataDirectory = get(dataDir);
		if (dataDirectory) {
			return await get(mutationStore).mutateAsync({
				dataDirectory,
				coversDirectory: dir
			});
		}
	}
	async function setupMangasDir(dir: string) {
		const dataDirectory = get(dataDir);
		if (dataDirectory) {
			return await get(mutationStore).mutateAsync({
				dataDirectory,
				mangasDirectory: dir
			});
		}
	}
	const disabled = derived(
		[isMounted, mutationStore],
		([isMounted, mutationStore]) => isMounted || mutationStore.isPending
	);
</script>

<h1>Offline Data Config</h1>

{#if $mutationStore.error}
	<ErrorComponent error={$mutationStore.error} label="Error on updating config" />
{/if}

{#if $queryStore.error}
	<ErrorComponent error={$queryStore.error} label="Error on fetching config" />
{/if}

{#if $isMounted}
	<WarningComponent
		label="The offline data is mounted"
		message="Please disable it to update the directories path"
	/>
{/if}

<section>
	<p>
		Data directory: <a
			class="dir-info"
			class:disabled={$disabled}
			onclick={() => {
				if ($dataDir) {
					openPath($dataDir).catch(console.warn);
				}
			}}
			href={`#${v4()}`}>{$dataDir}</a
		>
	</p>
	<ButtonAccentOnlyLabel
		disabled={$disabled}
		label="Select data directory"
		on:click={async () => {
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
				if ($mangasDir) {
					openPath($mangasDir);
				}
			}}
			href={`#${v4()}`}>{$mangasDir}</a
		>
	</p>
	<ButtonAccentOnlyLabel
		disabled={$disabled}
		label="Select titles directory"
		on:click={async () => {
			const dir = await dialogOpen({
				directory: true,
				title: "Select offline titles directory",
				multiple: false,
				defaultPath: $dataDir
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
				if ($chaptersDir) {
					openPath($chaptersDir);
				}
			}}
			href={`#${v4()}`}>{$chaptersDir}</a
		>
	</p>
	<ButtonAccentOnlyLabel
		disabled={$disabled}
		label="Select chapters directory"
		on:click={async () => {
			const dir = await dialogOpen({
				directory: true,
				title: "Select offline chapters directory",
				multiple: false,
				defaultPath: $dataDir
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
				if ($coversDir) {
					openPath($coversDir);
				}
			}}
			href={`#${v4()}`}>{$coversDir}</a
		>
	</p>
	<ButtonAccentOnlyLabel
		disabled={$disabled}
		label="Select covers directory"
		on:click={async () => {
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
