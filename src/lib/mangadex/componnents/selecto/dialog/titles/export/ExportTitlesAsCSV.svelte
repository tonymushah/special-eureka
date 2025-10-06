<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import exportTitlesToCSV from "@mangadex/gql-docs/title/export/csv";
	import type { ExportIdsLibraryToCsvOptions } from "@mangadex/gql/graphql";
	import { isLogged } from "@mangadex/utils/auth";
	import { save } from "@tauri-apps/plugin-dialog";
	import { revealItemInDir } from "@tauri-apps/plugin-opener";
	import { RotateCwIcon, SaveIcon } from "svelte-feather-icons";

	interface Props {
		titles: string[];
	}
	let { titles }: Props = $props();

	type Options = Omit<ExportIdsLibraryToCsvOptions, "exportPath" | "ids">;

	function defaultOptions(): Options {
		return {
			includeForumUrl: true,
			includeMdScore: true
		};
	}
	let revealAfterFinish: boolean = $state(true);
	let options: Options = $state(defaultOptions());
	async function submitExport() {
		const path = await save({
			title: "Export Titles as CSV",
			canCreateDirectories: true,
			filters: [
				{
					name: "CSV",
					extensions: ["csv"]
				}
			]
		});
		if (path == null) {
			addErrorToast("Invalid path", "The given path is invalid");
			throw new Error("Invalid path");
		}
		await exportTitlesToCSV.mutateAsync(
			{ ...options, ids: titles, exportPath: path },
			{
				onError(error, variables, context) {
					addErrorToast("Cannot export titles as CSV", error);
				},
				onSuccess(data, variables, context) {
					if (revealAfterFinish) {
						revealItemInDir(data);
					} else {
						addToast({
							data: {
								title: `Exported ${titles.length} titles`,
								description: data,
								variant: "blue"
							}
						});
					}
				}
			}
		);
	}
</script>

<section class="layout">
	<div class="title">
		<h3>Export titles as CSV</h3>
	</div>
	<div class="options">
		<div class="checkbox-layout">
			<input
				id="include-score"
				type="checkbox"
				class="checkbox"
				disabled={exportTitlesToCSV.isPending || !$isLogged}
				bind:checked={options.includeScores}
			/>
			<label for="include-score">Include your score</label>
		</div>
		<div class="checkbox-layout">
			<input
				id="include-read-volumes"
				type="checkbox"
				class="checkbox"
				disabled={exportTitlesToCSV.isPending || !$isLogged}
				bind:checked={options.includeReadVolumes}
			/>
			<label for="include-read-volumes">Include read volumes</label>
		</div>
		<div class="checkbox-layout">
			<input
				id="include-read-chapters"
				type="checkbox"
				class="checkbox"
				disabled={exportTitlesToCSV.isPending || !$isLogged}
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
				disabled={exportTitlesToCSV.isPending}
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
				disabled={exportTitlesToCSV.isPending}
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
				disabled={exportTitlesToCSV.isPending}
				defaultChecked
			/>
			<label for="reveal-after-finish">Reveal File After Finish</label>
		</div>
	</div>
	<div class="actions">
		<PrimaryButton
			isBase
			disabled={exportTitlesToCSV.isPending}
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
			onclick={(e) => {
				options = defaultOptions();
			}}
			disabled={exportTitlesToCSV.isPending}
		>
			<div class="button-content">
				<div class="icon">
					<RotateCwIcon size="20" strokeWidth={3} />
				</div>
				<p>Reset options</p>
			</div>
		</ButtonAccent>
	</div>
</section>

<style lang="scss">
	.title {
		display: flex;
	}
	.options {
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
		margin-top: 12px;
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
