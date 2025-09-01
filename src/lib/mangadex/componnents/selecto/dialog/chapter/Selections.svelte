<script lang="ts">
	import StatusBadgeOnlyLabel from "@mangadex/componnents/theme/tag/StatusBadgeOnlyLabel.svelte";
	import { createQuery, type CreateQueryOptions } from "@tanstack/svelte-query";
	import { getContextClient } from "@urql/svelte";
	import { toStore, derived as der } from "svelte/store";
	import { query } from "./selections";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";

	interface Props {
		chapters: string[];
	}
	let { chapters = $bindable([]) }: Props = $props();
	const chaps = toStore(() => chapters);
	type SelectedData = {
		title: {
			id: string;
			title: string;
		};
		chapters: {
			id: string;
			volume?: string;
			chapter?: string;
			isOneshot?: boolean;
			title?: string;
		}[];
	};
	const client = getContextClient();
	const selectedChapter = createQuery(
		der([chaps], ([chapters]) => {
			return {
				queryKey: ["get", "chapter", "data", ...chapters],
				async queryFn(): Promise<SelectedData[]> {
					const res = await client
						.query(query, {
							ids: chapters
						})
						.toPromise();
					if (res.error) {
						throw res.error;
					} else if (res.data) {
						return res.data.chapter.listWithGroupByManga.data.map<SelectedData>(
							(data) => {
								return {
									title: {
										id: data.manga.id,
										title:
											get_value_from_title_and_random_if_undefined(
												data.manga.attributes.title,
												"en"
											) ?? data.manga.id
									},
									chapters: data.chapters.map((data) => {
										return {
											id: data.id,
											title: data.attributes.title ?? undefined,
											volume: data.attributes.volume ?? undefined,
											chapter: data.attributes.chapter ?? undefined,
											isOneshot: data.attributes.title == "Oneshot"
										};
									})
								};
							}
						);
					} else {
						throw new Error("No Data?");
					}
				}
			} satisfies CreateQueryOptions<SelectedData[]>;
		})
	);
	let hasData = $derived($selectedChapter.data?.length != 0);
</script>

<p>Click on the badge to remove it from the selection</p>

<div class:hasData class="chapter-selected">
	{#if $selectedChapter.data}
		{#each $selectedChapter.data as section}
			<article>
				<h4>{section.title.title}</h4>
				<div class="chapaters">
					{#each section.chapters as chapter}
						{@const label = chapter.isOneshot
							? "Oneshot"
							: chapter.chapter && chapter.volume
								? `Vol.${chapter.volume} Ch.${chapter.chapter}`
								: chapter.chapter
									? `Ch.${chapter.chapter}`
									: chapter.volume
										? `Vol.${chapter.volume}`
										: chapter.id}
						<StatusBadgeOnlyLabel
							{label}
							color="blue"
							onclick={() => {
								chapters = chapters.filter((id) => id != chapter.id);
							}}
						/>
					{/each}
				</div>
			</article>
		{:else}
			{#each chapters as chapter}
				<StatusBadgeOnlyLabel
					label={chapter}
					color="gray"
					onclick={() => {
						chapters = chapters.filter((id) => id != chapter);
					}}
				/>
			{/each}
		{/each}
	{:else}
		{#each chapters as chapter}
			<StatusBadgeOnlyLabel
				label={chapter}
				color="gray"
				onclick={() => {
					chapters = chapters.filter((id) => id != chapter);
				}}
			/>
		{/each}
	{/if}
</div>

<style lang="scss">
	.chapter-selected {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		gap: 6px;
		overflow-y: scroll;
		width: 100%;
		max-height: 90%;
	}
	.chapter-selected.hasData {
		flex-direction: column;
		flex-wrap: nowrap;
		max-height: 90%;
		padding-bottom: 10px;
	}
	.chapaters {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		flex-direction: row;
	}
	p {
		margin: 4px 0px;
	}
	article {
		display: grid;
		border: 1px dashed var(--mid-tone);
		border-radius: 12px;
		padding: 6px;
		h4 {
			margin: 0px;
		}
		.chapaters {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			gap: 3px;
		}
	}
</style>
