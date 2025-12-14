<script lang="ts">
	import UploadIcon from "@mangadex/componnents/manga/page/top-info/buttons/upload/UploadIcon.svelte";
	import LanguagesBase from "@mangadex/componnents/manga/search/form/filter/content/languages/LanguagesBase.svelte";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import FormInput from "@mangadex/componnents/theme/form/input/FormInput.svelte";
	import { addErrorToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import Tooltip from "@mangadex/componnents/Tooltip.svelte";
	import { setInternalSessionCommitDataMutation } from "@mangadex/gql-docs/upload/session/mutations/set-commit-data";
	import type { Language } from "@mangadex/gql/graphql";
	import type { InternalSessionObjCommitData } from "@mangadex/stores/upload/sessions";
	import format_js_date_to_rs_md_date_time_str from "@mangadex/utils/date/md-formatter";
	import { toStore } from "svelte/store";

	interface Props {
		commitData?: InternalSessionObjCommitData;
		sessionId: string;
		isUploading?: boolean;
	}
	type InnerInternalSessionObjCommitData = Omit<
		InternalSessionObjCommitData,
		"translatedLanguage"
	> & {
		translatedLanguage?: Language;
	};
	let { commitData: pCommitData, sessionId, isUploading }: Props = $props();
	let commitData = $state<InnerInternalSessionObjCommitData | undefined>(
		structuredClone(pCommitData)
	);
	let mutation = setInternalSessionCommitDataMutation();
	let disabledButtons = $derived(
		mutation.isPending || isUploading || commitData?.translatedLanguage == undefined
	);
</script>

<!-- TODO implement this commit-data thingy -->
<div class="commit-data">
	<h4>Commit data</h4>
	<div class="commit-data-form">
		<div class="input">
			<LanguagesBase
				showLangName
				rowLayout
				titleAsParagraph
				title="Translated language:"
				placement="bottom"
				selecteds={toStore(
					() => {
						const lang = commitData?.translatedLanguage;
						console.log(lang);
						if (lang != undefined) {
							return [lang];
						} else {
							return [];
						}
					},
					(val) => {
						if (val.length == 0) {
							if (commitData) {
								commitData.translatedLanguage = undefined;
							}
						} else if (val.length == 1) {
							if (commitData) {
								commitData.translatedLanguage = val[0];
							} else {
								commitData = {
									translatedLanguage: val[0]
								};
							}
						}
					}
				)}
			/>
		</div>
		<div class="input">
			<p class="label">Chapter:</p>
			<FormInput
				inputProps={{
					placeholder: "Chapter number here"
				}}
				bind:value={
					() => {
						return commitData?.chapter;
					},
					(value) => {
						if (commitData) {
							commitData.chapter = value;
						} else {
							commitData = {
								chapter: value
							};
						}
					}
				}
			/>
		</div>
		<div class="input">
			<p class="label">Title:</p>
			<FormInput
				inputProps={{
					placeholder: "Chapter title here"
				}}
				bind:value={
					() => {
						return commitData?.title;
					},
					(value) => {
						if (commitData) {
							commitData.title = value;
						} else {
							commitData = {
								title: value
							};
						}
					}
				}
			/>
		</div>
		<div class="input">
			<p class="label">Volume:</p>
			<FormInput
				inputProps={{
					placeholder: "Volume number here"
				}}
				bind:value={
					() => {
						return commitData?.volume;
					},
					(value) => {
						if (commitData) {
							commitData.volume = value;
						} else {
							commitData = {
								volume: value
							};
						}
					}
				}
			/>
		</div>
		<div class="input">
			<p class="label">Publish at:</p>
			<FormInput
				inputProps={{
					placeholder: "Chapter number here",
					type: "datetime-local"
				}}
				bind:value={
					() => {
						return commitData?.publishAt;
					},
					(value) => {
						if (commitData) {
							commitData.publishAt = value;
						} else {
							commitData = {
								publishAt: value
							};
						}
					}
				}
			/>
		</div>
		<div class="input">
			<p class="label">External url:</p>
			<FormInput
				inputProps={{
					placeholder: "External url here"
				}}
				bind:value={
					() => {
						return commitData?.externalUrl;
					},
					(value) => {
						if (commitData) {
							commitData.externalUrl = value;
						} else {
							commitData = {
								externalUrl: value
							};
						}
					}
				}
			/>
		</div>
		<div class="input">
			<input
				type="checkbox"
				bind:checked={
					() => commitData?.termsAccepted,
					(value) => {
						if (commitData) {
							commitData.termsAccepted = value;
						} else {
							commitData = {
								termsAccepted: value
							};
						}
					}
				}
				class="termsAccepted"
			/>
			<p class="label">
				<Tooltip>
					{#snippet triggerContent()}
						Terms Accepted
					{/snippet}
					{#snippet tooltipContent()}
						This is required since the MD Nuke Day of May 15th 2025
					{/snippet}
				</Tooltip>
			</p>
		</div>
	</div>
	<div class="buttons">
		<PrimaryButton
			disabled={disabledButtons}
			onclick={() => {
				if (commitData?.translatedLanguage != undefined) {
					mutation.mutate(
						{
							commitData: {
								translatedLanguage: commitData.translatedLanguage,
								publishAt: commitData.publishAt
									? format_js_date_to_rs_md_date_time_str(new Date(commitData.publishAt))
									: undefined,
								...commitData
							},
							sessionId,
							startRunner: true
						},
						{
							onError(err) {
								addErrorToast("Cannot commit or upload", err);
							}
						}
					);
				}
			}}
		>
			<div class="inner">
				<UploadIcon />
				Commit and upload
			</div>
		</PrimaryButton>
		<ButtonAccent
			disabled={disabledButtons}
			onclick={() => {
				if (commitData?.translatedLanguage != undefined) {
					mutation.mutate(
						{
							commitData: {
								translatedLanguage: commitData.translatedLanguage,
								publishAt: commitData.publishAt
									? format_js_date_to_rs_md_date_time_str(new Date(commitData.publishAt))
									: undefined,
								...commitData
							},
							sessionId
						},
						{
							onError(err) {
								addErrorToast("Cannot set commit data", err);
							}
						}
					);
				}
			}}
		>
			Set commit data
		</ButtonAccent>
	</div>
</div>

<style lang="scss">
	@use "@special-eureka/core/sass/_breakpoints.scss" as bp;
	@use "sass:map";

	.commit-data-form {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 12px;
		.input {
			display: flex;
			align-items: center;
			gap: 4px;
			.label {
				margin: 0px;
			}
		}
	}
	h4 {
		margin: 0px;
		text-decoration: underline;
	}
	.termsAccepted {
		width: 24px;
		height: 24px;
	}
	.buttons {
		display: flex;
		align-items: center;
		gap: 12px;
		.inner {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 6px;
		}
	}
</style>
