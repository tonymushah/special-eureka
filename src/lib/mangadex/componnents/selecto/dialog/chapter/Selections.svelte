<!-- TODO cache selections -->

<script lang="ts">
	import StatusBadgeOnlyLabel from "@mangadex/componnents/theme/tag/StatusBadgeOnlyLabel.svelte";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
	import { createQuery, type CreateQueryOptions } from "@tanstack/svelte-query";
	import { getContextClient } from "@urql/svelte";
	import { query } from "./selections";

	interface Props {
		chapters: string[];
	}
	let { chapters = $bindable([]) }: Props = $props();
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
	let _selectedChapter = createQuery(() => {
		return {
			queryKey: ["get", "chapter", "data", "in", "selecto"],
			async queryFn() {
				const res = await client
					.query(query, {
						ids: [...chapters]
					})
					.toPromise();
				if (res.error) {
					throw res.error;
				} else if (res.data) {
					return res.data.chapter.listWithGroupByManga.data;
				} else {
					throw new Error("No Data?");
				}
			},
			enabled: chapters.length > 0,
			staleTime: 0
		};
	});
	let selectedChapters: SelectedData[] = $derived.by(() => {
		return (
			_selectedChapter.data
				?.map<SelectedData>((data) => {
					return {
						title: {
							id: data.manga.id,
							title:
								get_value_from_title_and_random_if_undefined(data.manga.attributes.title, "en") ??
								data.manga.id
						},
						chapters: data.chapters
							.filter((data) => chapters.includes(data.id))
							.map((data) => {
								return {
									id: data.id,
									title: data.attributes.title ?? undefined,
									volume: data.attributes.volume ?? undefined,
									chapter: data.attributes.chapter ?? undefined,
									isOneshot: data.attributes.title == "Oneshot"
								};
							})
					};
				})
				.filter((data) => data.chapters.length != 0) ?? []
		);
	});
	let hasData = $derived(_selectedChapter.isSuccess);
</script>

<p>Click on the badge to remove it from the selection</p>

{#snippet showIds()}
	{#each chapters as chapter}
		<StatusBadgeOnlyLabel
			label={chapter}
			color="gray"
			onclick={() => {
				chapters = chapters.filter((id) => id != chapter);
			}}
		/>
	{/each}
{/snippet}

<div class:hasData class="chapter-selected">
	{#if _selectedChapter.isSuccess}
		{#each selectedChapters as section}
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
			{@render showIds()}
		{/each}
	{:else}
		{@render showIds()}
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
