<script lang="ts">
	import ErrorComponent from "@mangadex/componnents/ErrorComponent.svelte";
	import { isSidebarRtl } from "@mangadex/componnents/sidebar/states/isRtl";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import FormInput from "@mangadex/componnents/theme/form/input/FormInput.svelte";
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import { exportLibraryToMyAnimeList } from "@mangadex/gql-docs/library/export/my-anime-list";
	import {
		MaltitlePriority,
		type MdlibraryToMyAnimeListExportOption,
		type ReadingStatusPriorities
	} from "@mangadex/gql/graphql";
	import { exportTaskEvent } from "@mangadex/stores/library/export/mal";
	import { isLogged } from "@mangadex/utils/auth";
	import defaultReadingStatusPriorities from "@mangadex/utils/readingStatusPriorities";
	import { createProgress, melt } from "@melt-ui/svelte";
	import { isLinuxStore } from "@special-eureka/core/commands/isLinux";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	import { save } from "@tauri-apps/plugin-dialog";
	import { revealItemInDir } from "@tauri-apps/plugin-opener";
	import { RotateCwIcon, SaveIcon } from "svelte-feather-icons";
	import { writable } from "svelte/store";
	import { slide } from "svelte/transition";
	import { v4 } from "uuid";

	type Options = Omit<MdlibraryToMyAnimeListExportOption, "priorities" | "exportPath"> & {
		priorities: ReadingStatusPriorities;
	};

	function defaultOptions(): Options {
		return {
			userId: "",
			userName: "",
			priorities: defaultReadingStatusPriorities(),
			excludeContentProfile: true,
			hasAvailableChapters: true
		};
	}
	let options: Options = $state(defaultOptions());
	let revealAfterFinish: boolean = $state(true);

	async function submitExport() {
		const exportPath = await save({
			title: "Export MangaDex library to My Anime List XML Import",
			canCreateDirectories: true,
			filters: [
				{
					name: "XML Import My Anime List",
					extensions: ["xml"]
				}
			]
		}).catch((e) => {
			addErrorToast("Cannot create file", e);
		});
		try {
			if (typeof exportPath == "string") {
				await exportLibraryToMyAnimeList.mutateAsync(
					{ ...options, exportPath },
					{
						onSettled(data, error, variables) {
							console.debug(variables);
						},
						onSuccess(data) {
							addToast({
								data: {
									title: "Library exported",
									description: data
								}
							});
							if (revealAfterFinish) {
								revealItemInDir(data);
							}
						},
						onError(error) {
							addErrorToast(
								"Cannot export library as a My Anime List XML Import file",
								error
							);
						}
					}
				);
			} else {
				addErrorToast("Invalid `null` output from save", null);
				return;
			}
		} catch (error) {
			addErrorToast("Cannot export library as a My Anime List XML Import file", error);
		}
	}
	const user_id_input_id = v4();
	const user_name_input_id = v4();
	const reading_id = v4();
	const reReading_id = v4();
	const planToRead_id = v4();
	const completed_id = v4();
	const dropped_id = v4();
	const on_hold_id = v4();
	const progressValue = writable(0, (set) => {
		return exportTaskEvent.subscribe((d) => {
			set(d?.progress ?? 0);
		});
	});
	const {
		elements: { root: progressRoot },
		options: { max: progressMax }
	} = createProgress({
		value: progressValue,
		max: 255
	});
</script>

<AppTitle title="Export Library as MyAnimeList - MangaDex" />

<div class="export-layout">
	<Title>Export as MyAnimeList</Title>
	{#if exportLibraryToMyAnimeList.error && !exportLibraryToMyAnimeList.isPending}
		<div
			transition:slide={{
				axis: "y"
			}}
		>
			<ErrorComponent
				label="Cannot export library"
				error={exportLibraryToMyAnimeList.error}
				close={() => {
					exportLibraryToMyAnimeList.reset();
				}}
			/>
		</div>
	{:else if exportLibraryToMyAnimeList.isPending && $exportTaskEvent}
		{@const c_state = $exportTaskEvent.state}
		<div
			transition:slide={{
				axis: "y"
			}}
			class="loading"
		>
			<p>
				{#if c_state == "Preloading"}
					Preloading...
				{:else if c_state == "AssemblingInfo"}
					Assembling infos...
				{:else if c_state == "GettingScores"}
					Getting scores...
				{:else if c_state == "GettingStatuses"}
					Getting statuses...
				{:else if c_state == "GettingTitlesData"}
					Getting titltes data...
				{:else if c_state == "WritingToFile"}
					Writing file...
				{:else if c_state.FetchingReadChapter}
					Fetching {c_state.FetchingReadChapter.manga} read chapters...
				{/if}
			</p>
			<div class="progress" use:melt={$progressRoot}>
				<div
					class="progress-inner"
					style={`transform: translateX(-${
						100 - (100 * ($progressValue ?? 0)) / ($progressMax ?? 1)
					}%)`}
				></div>
			</div>
		</div>
	{/if}
	<section class="input-row">
		<label for={user_id_input_id}>User Id: </label>
		<FormInput
			inputProps={{
				id: user_id_input_id,
				disabled: exportLibraryToMyAnimeList.isPending,
				required: true
			}}
			bind:value={options.userId}
		/>
	</section>
	<section class="input-row">
		<label for={user_name_input_id}>Username: </label>
		<FormInput
			inputProps={{
				id: user_name_input_id,
				disabled: exportLibraryToMyAnimeList.isPending,
				required: true
			}}
			bind:value={options.userName}
		/>
	</section>
	<section class="input-row">
		<Title underline type={4}>Reading Status Priorities</Title>
		<section class="priorities" class:isNotLinux={!$isLinuxStore}>
			<div class="priority">
				<label for={reading_id}>Reading: </label>
				<select
					bind:value={options.priorities.reading}
					disabled={exportLibraryToMyAnimeList.isPending}
					id={reading_id}
				>
					<option value={MaltitlePriority.Low}>Low</option>
					<option value={MaltitlePriority.Medium}>Medium</option>
					<option value={MaltitlePriority.High}>High</option>
				</select>
			</div>
			<div class="priority">
				<label for={on_hold_id}>On-Hold: </label>
				<select
					bind:value={options.priorities.onHold}
					disabled={exportLibraryToMyAnimeList.isPending}
					id={on_hold_id}
				>
					<option value={MaltitlePriority.Low}>Low</option>
					<option value={MaltitlePriority.Medium}>Medium</option>
					<option value={MaltitlePriority.High}>High</option>
				</select>
			</div>
			<div class="priority">
				<label for={planToRead_id}>Plan to Read: </label>
				<select
					bind:value={options.priorities.planToRead}
					disabled={exportLibraryToMyAnimeList.isPending}
					id={planToRead_id}
				>
					<option value={MaltitlePriority.Low}>Low</option>
					<option value={MaltitlePriority.Medium}>Medium</option>
					<option value={MaltitlePriority.High}>High</option>
				</select>
			</div>
			<div class="priority">
				<label for={completed_id}>Completed: </label>
				<select
					bind:value={options.priorities.completed}
					disabled={exportLibraryToMyAnimeList.isPending}
					id={completed_id}
				>
					<option value={MaltitlePriority.Low}>Low</option>
					<option value={MaltitlePriority.Medium}>Medium</option>
					<option value={MaltitlePriority.High}>High</option>
				</select>
			</div>
			<div class="priority">
				<label for={reReading_id}>Re-Reading: </label>
				<select
					bind:value={options.priorities.reReading}
					disabled={exportLibraryToMyAnimeList.isPending}
					id={reReading_id}
				>
					<option value={MaltitlePriority.Low}>Low</option>
					<option value={MaltitlePriority.Medium}>Medium</option>
					<option value={MaltitlePriority.High}>High</option>
				</select>
			</div>
			<div class="priority">
				<label for={dropped_id}>Dropped: </label>
				<select
					bind:value={options.priorities.dropped}
					disabled={exportLibraryToMyAnimeList.isPending}
					id={dropped_id}
				>
					<option value={MaltitlePriority.Low}>Low</option>
					<option value={MaltitlePriority.Medium}>Medium</option>
					<option value={MaltitlePriority.High}>High</option>
				</select>
			</div>
		</section>
	</section>
	<section class="checkboxes">
		<div class="checkbox-layout">
			<input
				id="exclude-content-profile"
				type="checkbox"
				class="checkbox"
				bind:checked={options.excludeContentProfile}
				disabled={exportLibraryToMyAnimeList.isPending}
				defaultChecked
			/>
			<label for="exclude-content-profile">Exclude content profile</label>
		</div>
		<div class="checkbox-layout">
			<input
				id="has-available-chapters"
				type="checkbox"
				class="checkbox"
				bind:checked={options.hasAvailableChapters}
				disabled={exportLibraryToMyAnimeList.isPending}
				defaultChecked
			/>
			<label for="has-available-chapter">Has available chapter</label>
		</div>
		<div class="checkbox-layout">
			<input
				id="include-score"
				type="checkbox"
				class="checkbox"
				disabled={exportLibraryToMyAnimeList.isPending}
				bind:checked={options.includeScore}
			/>
			<label for="include-score">Include score</label>
		</div>
		<div class="checkbox-layout">
			<input
				id="include-read-volumes"
				type="checkbox"
				class="checkbox"
				disabled={exportLibraryToMyAnimeList.isPending}
				bind:checked={options.includeReadVolumes}
			/>
			<label for="include-read-volumes">Include read volumes</label>
		</div>
		<div class="checkbox-layout">
			<input
				id="include-read-chapters"
				type="checkbox"
				class="checkbox"
				disabled={exportLibraryToMyAnimeList.isPending}
				bind:checked={options.includeReadChapters}
			/>
			<label for="include-read-chapters">Include read chapters</label>
		</div>
		<div class="checkbox-layout">
			<input
				id="reveal-after-finish"
				type="checkbox"
				class="checkbox"
				bind:checked={revealAfterFinish}
				disabled={exportLibraryToMyAnimeList.isPending}
				defaultChecked
			/>
			<label for="reveal-after-finishi">Reveal File After Finish</label>
		</div>
	</section>
	<section class="actions" class:isLtr={!$isSidebarRtl}>
		<PrimaryButton
			isBase
			disabled={exportLibraryToMyAnimeList.isPending || !$isLogged}
			onclick={(e) => {
				submitExport();
			}}
		>
			<div class="button-content">
				<div class="icon">
					<SaveIcon size="20" strokeWidth={3} />
				</div>
				<p>Export</p>
			</div>
		</PrimaryButton>
		<ButtonAccent
			isBase
			variant="3"
			onclick={() => {
				options = defaultOptions();
			}}
			disabled={exportLibraryToMyAnimeList.isPending}
		>
			<div class="button-content">
				<div class="icon">
					<RotateCwIcon size="20" strokeWidth={3} />
				</div>
				<p>Reset</p>
			</div>
		</ButtonAccent>
	</section>
	<section class="notes">
		<p>
			<u>Note:</u> Since exporting your library sends a lot of requests to the MangaDex API,
			it is
			<b>recommended to not open MangaDex on your browser </b>
			<i>or any similar activities that might send unecessary requests to the API </i>
			because it might blow your
			<i>IP rate-limit</i>
			and also check if <b>your internet connection is smooth enough</b> for this operation.
			(also check if you have enough RAM too.
			<code>`The bigger the library, the more it needs RAM`</code>)
		</p>
	</section>
</div>

<style lang="scss">
	.export-layout {
		display: grid;
		margin: 0px 12px;
		gap: 6px;
	}
	.input-row {
		display: grid;
	}
	.priorities {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 8px 12px;
		align-items: center;
		.priority {
			display: flex;
			flex-direction: row;
			gap: 4px;
			flex-wrap: nowrap;
			align-items: center;
			justify-content: center;
			select {
				font-family: var(--fonts);
			}
		}
	}
	.priorities.isNotLinux {
		select {
			background-color: var(--accent-l1);
			color: var(--text-color);
		}
	}
	.checkboxes {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 8px 12px;
		align-items: center;
		.checkbox-layout {
			display: flex;
			flex-direction: row;
			gap: 4px;
			flex-wrap: nowrap;
			align-items: center;
			justify-content: center;
			.checkbox {
				width: 18px;
				height: 18px;
			}
		}
	}
	.actions {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		.button-content {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 4px;
			padding: 0px 12px;
			.icon {
				display: flex;
				align-items: center;
				justify-content: center;
				transform: translateY(-1px);
			}
			p {
				margin: 0px;
			}
		}
	}
	.progress {
		position: relative;
		height: 1em;
		width: 80%;
		overflow: hidden;
		border-radius: 99999999px;
		background-color: var(--accent-l5);
		.progress-inner {
			height: 100%;
			width: 100%;
			background-color: var(--primary-l2);
			transition: transform ease-in-out 100ms;
		}
	}
	.progress:hover {
		background-color: var(--accent-l5-hover);
	}
	.progress:active {
		background-color: var(--accent-l5-active);
	}
	.loading {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
</style>
