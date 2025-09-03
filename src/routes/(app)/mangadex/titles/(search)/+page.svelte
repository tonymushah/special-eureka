<script lang="ts">
	import { TagOptionState } from "@mangadex/componnents/manga/search/form/filter/contexts/tags";
	import MangaSearchForm from "@mangadex/componnents/manga/search/form/MangaSearchForm.svelte";
	import defaultMangaSearchParams, {
		mangaSearchParamsFromContentProfile,
		toMangaListParams,
		type MangaSearchParams
	} from "@mangadex/componnents/manga/search/form/state";
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import defaultContentProfile from "@mangadex/content-profile/graphql/defaultProfile";
	import type { MangaListParams } from "@mangadex/gql/graphql";
	import { derived, get, writable } from "svelte/store";
	import type { PageData } from "./$types";
	import SearchContent from "./SearchContent.svelte";
	import pageLimit from "@mangadex/stores/page-limit";
	import { setContextMenuContext } from "@special-eureka/core/utils/contextMenuContext";
	import contextMenu, {
		ContextMenuItemProvider
	} from "@special-eureka/core/commands/contextMenu";
	import defaultContextMenuContent from "@mangadex/utils/defaultContextMenuContent";
	import goto_sub_menu from "@mangadex/componnents/sidebar/goto_sub_menu";
	import { delay } from "lodash";
	import PageTitle from "@mangadex/componnents/pages/PageTitle.svelte";

	interface Props {
		data: PageData;
	}

	let { data = $bindable() }: Props = $props();
	const defaultParams = writable(defaultMangaSearchParams());

	$effect(() => {
		return defaultContentProfile.subscribe((defaultProfile) => {
			defaultParams.update((p) => {
				p = mangaSearchParamsFromContentProfile(defaultProfile);
				data.tags?.forEach((tag) => {
					p.filter.tags.set(tag.id, {
						state: TagOptionState.NONE,
						name: tag.name,
						group: tag.group
					});
				});
				defaultProfile.excludedTags.forEach((tag) => {
					const inner_tag = p.filter.tags.get(tag);
					if (inner_tag) {
						inner_tag.state = TagOptionState.EXCLUDE;
						p.filter.tags.set(tag, inner_tag);
					}
				});
				defaultProfile.includedTags.forEach((tag) => {
					const inner_tag = p.filter.tags.get(tag);
					if (inner_tag) {
						inner_tag.state = TagOptionState.INCLUDE;
						p.filter.tags.set(tag, inner_tag);
					}
				});
				return p;
			});
		});
	});
	const currentSearchParams = writable<MangaSearchParams | undefined>(
		undefined,
		(set, _update) => {
			return defaultParams.subscribe((params) => {
				set(params);
			});
		}
	);
	const preListParams = derived(currentSearchParams, ($p) => {
		if ($p) {
			return toMangaListParams($p);
		}
	});
	const isEmpty = derived(preListParams, ($p) => $p == undefined);
	const listParams = derived([preListParams, pageLimit], ([$p, $limit]) => {
		if ($p) {
			return {
				...$p,
				limit: $limit
			} satisfies MangaListParams;
		} else {
			return {
				limit: $limit
			} satisfies MangaListParams;
		}
	});
	let realTime = $state(false);
	const offlineStore = derived(currentSearchParams, ($p) => $p?.offlineOnly ?? false);
	let dialog_bind: HTMLDialogElement | undefined = $state();

	let topElement: HTMLElement | undefined = $state(undefined);

	const menu = setContextMenuContext(() => [
		...defaultContextMenuContent(),
		ContextMenuItemProvider.seperator(),
		goto_sub_menu(),
		ContextMenuItemProvider.seperator(),
		ContextMenuItemProvider.menuItem({
			text: "Change filters",
			action() {
				dialog_bind?.showModal();
			}
		}),
		ContextMenuItemProvider.menuItem({
			text: "Go to top",
			action() {
				delay(() => {
					topElement?.scrollIntoView(true);
				}, 10);
				console.log(topElement);
			}
		})
	]);
</script>

<main
	oncontextmenu={async (e) => {
		e.preventDefault();
		await contextMenu(
			[
				...menu(),
				ContextMenuItemProvider.seperator(),
				ContextMenuItemProvider.menuItem({
					text: get(offlineStore) ? "Include online" : "Local only",
					action() {
						defaultParams.update((d) => {
							if (d) {
								d.offlineOnly = !d.offlineOnly;
							}
							return d;
						});
					}
				})
			],
			e
		);
	}}
>
	<section class="title" bind:this={topElement}>
		<PageTitle title={"Advanced Titles Search"} titleType={1} withReturn />
	</section>

	<section class="form-search">
		<MangaSearchForm
			bind:dialog_bind
			bind:realTime
			bind:defaultParams={$defaultParams}
			onchange={(detail) => {
				if (realTime) {
					currentSearchParams.set(detail);
				}
			}}
			onsubmit={(detail) => {
				if (!realTime) {
					currentSearchParams.set(detail);
				}
			}}
		/>
	</section>

	<section class="content">
		{#if !$isEmpty}
			<SearchContent params={listParams} {offlineStore} excludeContentProfile />
		{/if}
	</section>
</main>

<style lang="scss">
	.content {
		margin-top: 12px;
	}
</style>
