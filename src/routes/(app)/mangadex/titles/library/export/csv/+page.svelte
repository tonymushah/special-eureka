<script lang="ts">
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import { exportLibraryToCSV as exportLibraryToCSVLoader } from "@mangadex/gql-docs/library/export/csv";
	import type { ExportMdLibraryToCsvOptions } from "@mangadex/gql/graphql";
	import { save } from "@tauri-apps/plugin-dialog";
	import { revealItemInDir } from "@tauri-apps/plugin-opener";
	import ExportIcon from "./ExportIcon.svelte";
	import { RotateCwIcon } from "svelte-feather-icons";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import { isSidebarRtl } from "@mangadex/componnents/sidebar/states/isRtl";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { isLogged } from "@mangadex/utils/auth";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";

	type Options = Omit<ExportMdLibraryToCsvOptions, "exportPath">;

	function defaultOptions(): Options {
		return {
			excludeContentProfile: true,
			hasAvailableChapters: true,
			includeMdScore: true,
			includeForumUrl: true
		};
	}

	let exportLibraryToCSV = exportLibraryToCSVLoader();
	let options: Options = $state(defaultOptions());
	let revealAfterFinish: boolean = $state(true);

	async function submitExport() {
		const exportPath = await save({
			title: "Export MangaDex Library a CSV file",
			canCreateDirectories: true,
			filters: [
				{
					name: "CSV",
					extensions: ["csv"]
				}
			]
		}).catch((e) => {
			addErrorToast("Cannot create file", e);
		});
		try {
			if (typeof exportPath == "string") {
				await exportLibraryToCSV.mutateAsync(
					{ ...options, exportPath },
					{
						onSettled(data, error, variables, context) {
							console.debug(variables);
						},
						onSuccess(data, variables, context) {
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
						onError(error, variables, context) {
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
		} catch (e) {
			addErrorToast("Cannot export library as a CSV file", e);
		}
	}
</script>

<AppTitle title="Export Library as CSV - MangaDex" />

<div class="export-layout">
	<Title>Export as CSV</Title>
	<section class="checkboxes">
		<div class="checkbox-layout">
			<input
				id="exclude-content-profile"
				type="checkbox"
				class="checkbox"
				bind:checked={options.excludeContentProfile}
				disabled={exportLibraryToCSV.isPending}
				defaultChecked
			/>
			<label for="exclude-content-profile">Exclude content profile</label>
		</div>
		<div class="checkbox-layout">
			<input
				id="include-score"
				type="checkbox"
				class="checkbox"
				disabled={exportLibraryToCSV.isPending}
				bind:checked={options.includeScores}
			/>
			<label for="include-score">Include your score</label>
		</div>
		<div class="checkbox-layout">
			<input
				id="include-read-volumes"
				type="checkbox"
				class="checkbox"
				disabled={exportLibraryToCSV.isPending}
				bind:checked={options.includeReadVolumes}
			/>
			<label for="include-read-volumes">Include read volumes</label>
		</div>
		<div class="checkbox-layout">
			<input
				id="include-read-chapters"
				type="checkbox"
				class="checkbox"
				disabled={exportLibraryToCSV.isPending}
				bind:checked={options.includeReadChapters}
			/>
			<label for="include-read-chapters">Include read chapters</label>
		</div>
		<div class="checkbox-layout">
			<input
				id="include-mangadex-scores"
				type="checkbox"
				class="checkbox"
				bind:checked={options.includeMdScore}
				disabled={exportLibraryToCSV.isPending}
				defaultChecked
			/>
			<label for="include-mangadex-scores">Include MangaDex Scores</label>
		</div>
		<div class="checkbox-layout">
			<input
				id="include-forum-url"
				type="checkbox"
				class="checkbox"
				bind:checked={options.includeForumUrl}
				disabled={exportLibraryToCSV.isPending}
				defaultChecked
			/>
			<label for="include-forum-url">Include Forum Urls</label>
		</div>
		<div class="checkbox-layout">
			<input
				id="reveal-after-finish"
				type="checkbox"
				class="checkbox"
				bind:checked={revealAfterFinish}
				disabled={exportLibraryToCSV.isPending}
				defaultChecked
			/>
			<label for="reveal-after-finish">Reveal File After Finish</label>
		</div>
	</section>

	<section class="actions" class:isLtr={!$isSidebarRtl}>
		<PrimaryButton
			isBase
			disabled={exportLibraryToCSV.isPending || !$isLogged}
			onclick={(e) => {
				submitExport();
			}}
		>
			<div class="button-content">
				<ExportIcon />
				<p>Export</p>
			</div>
		</PrimaryButton>
		<ButtonAccent
			isBase
			variant="3"
			onclick={(e) => {
				options = defaultOptions();
			}}
			disabled={exportLibraryToCSV.isPending}
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
			it is <b>recommended to not open MangaDex on your browser </b>
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
	.checkboxes {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 8px 12px;
		align-items: center;
		.checkbox-layout {
			display: flex;
			flex-direction: row;
			gap: 4px;
			flex-wrap: nowrap;
			align-items: center;
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
</style>
