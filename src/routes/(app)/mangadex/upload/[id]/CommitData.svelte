<script lang="ts">
	import LanguagesBase from "@mangadex/componnents/manga/search/form/filter/content/languages/LanguagesBase.svelte";
	import { setInternalSessionCommitDataMutation } from "@mangadex/gql-docs/upload/session/mutations/set-commit-data";
	import type { Language } from "@mangadex/gql/graphql";
	import type { InternalSessionObjCommitData } from "@mangadex/stores/upload/sessions";
	import { toStore } from "svelte/store";

	interface Props {
		commitData?: InternalSessionObjCommitData;
		sessionId: string;
	}
	type InnerInternalSessionObjCommitData = Omit<
		InternalSessionObjCommitData,
		"translatedLanguage"
	> & {
		translatedLanguage?: Language;
	};
	let { commitData: pCommitData, sessionId }: Props = $props();
	let commitData = $state<InnerInternalSessionObjCommitData | undefined>(
		structuredClone(pCommitData)
	);
	let mutation = setInternalSessionCommitDataMutation();
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
	</div>
</div>

<style lang="scss">
	@use "@special-eureka/core/sass/_breakpoints.scss" as bp;
	@use "sass:map";

	.commit-data-form {
		display: grid;
		.input {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
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
</style>
