<script lang="ts">
	import { tagWritableToComboboxOptionWritable } from "@mangadex/componnents/manga/search/form/filter/content/authors/utils";
	import FormInput from "@mangadex/componnents/theme/form/input/FormInput.svelte";
	import MangaDexVarThemeProvider from "@mangadex/componnents/theme/MangaDexVarThemeProvider.svelte";
	import { groupSearchAndGetNameOnly } from "@mangadex/gql-docs/group/search/name-only";
	import { client } from "@mangadex/gql/urql";
	import pageLimit from "@mangadex/stores/page-limit";
	import { createCombobox, createTagsInput, melt } from "@melt-ui/svelte";
	import type { PortalConfig } from "@melt-ui/svelte/internal/actions";
	import { createInfiniteQuery, createQuery } from "@tanstack/svelte-query";
	import { onDestroy } from "svelte";
	import { XIcon } from "svelte-feather-icons";
	import { slide } from "svelte/transition";
	import { getMangaTitleOnlyQuery } from "@mangadex/gql-docs/title/id/title-only";
	import Tooltip from "@mangadex/componnents/Tooltip.svelte";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
	import PrimaryButtonOnlyLabel from "@mangadex/componnents/theme/buttons/PrimaryButtonOnlyLabel.svelte";
	import UploadIcon from "@mangadex/componnents/manga/page/top-info/buttons/upload/UploadIcon.svelte";
	import { createSessionMutation } from "@mangadex/gql-docs/upload/mutations/create-session";
	import { addErrorToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";

	interface Props {
		mangaId: string;
		title?: string;
		ondone?: (sessionId: string) => void;
		portal?: PortalConfig | undefined;
		onclose?: () => void;
	}
	let { mangaId, title, ondone, portal }: Props = $props();
	let mutation = createSessionMutation();
	const {
		elements: { root, tag, deleteTrigger },
		states: { tags: groups }
	} = createTagsInput({
		unique: true
	});
	const {
		elements: { input, menu, option },
		states: { open, inputValue, touchedInput },
		helpers: { isSelected }
	} = createCombobox<string, true>({
		selected: tagWritableToComboboxOptionWritable(groups),
		forceVisible: true,
		multiple: true,
		positioning: {
			placement: "top",
			fitViewport: true,
			sameWidth: true
			// strategy: "fixed"
		},
		portal
	});
	type GroupSearchQueryParams = {
		limit?: number;
		offset?: number;
		name?: string;
	};

	let groupSearchQuery = createInfiniteQuery(() => ({
		queryKey: [
			"upload",
			"dialog",
			"body",
			"scanlation-groups",
			"search",
			`nameInput:${$inputValue}`,
			`limit:${$pageLimit}`
		],
		async queryFn({ pageParam }) {
			const res = await client
				.query(groupSearchAndGetNameOnly, {
					limit: pageParam.limit,
					offset: pageParam.offset,
					name: pageParam.name
				})
				.toPromise();
			if (res.data) {
				return res.data.scanlationGroup.list;
			} else if (res.error) {
				throw res.error;
			} else {
				throw new Error("no data");
			}
		},
		enabled: $touchedInput && mutation.isPending,
		initialPageParam: {
			limit: $pageLimit
		} as GroupSearchQueryParams,
		getNextPageParam(lastPage, _, lastPageParam) {
			const nextOffset = lastPage.limit + lastPage.limit;
			if (nextOffset > lastPage.total) {
				return {
					...lastPageParam,
					offset: nextOffset,
					limit: lastPage.limit
				};
			} else {
				return null;
			}
		}
	}));
	let groupSearchData = $derived.by(() => {
		const map = new Map(
			groupSearchQuery.data?.pages.flatMap((d) => d.data).map((d) => [d.id, d.attributes.name])
		);
		return map
			.entries()
			.map(([id, value]) => ({
				id,
				value
			}))
			.toArray();
	});
	let toObserve = $state<HTMLElement | undefined>();
	const observer = new IntersectionObserver((observers) => {
		observers.forEach(() => {
			groupSearchQuery.fetchNextPage();
		});
	});
	$effect(() => {
		if (toObserve) {
			observer.observe(toObserve);
			return () => {
				if (toObserve) observer.unobserve(toObserve);
			};
		}
	});
	onDestroy(() => {
		observer.disconnect();
	});
	let mangaTitleQuery = createQuery(() => ({
		queryKey: ["manga", mangaId, "title-only"],
		async queryFn() {
			const res = await client
				.query(getMangaTitleOnlyQuery, {
					mangaId
				})
				.toPromise();
			if (res.data) {
				return res.data.manga.get.attributes.title as Record<string, string>;
			} else if (res.error) {
				throw res.error;
			} else {
				throw new Error("no data");
			}
		},
		enabled: !title
	}));
	let toShowTitle = $derived.by(() => {
		if (title) {
			return title;
		} else if (mangaTitleQuery.isSuccess) {
			return get_value_from_title_and_random_if_undefined(mangaTitleQuery.data, "en");
		}
	});
</script>

<div class="body">
	<div class="title">
		<p>
			Title: <Tooltip openOnLayoutClick>
				{#snippet tooltipContent()}
					{#if toShowTitle}
						ID: {mangaId}
					{:else}
						Cannot load the title at the moment
					{/if}
				{/snippet}
				{#snippet triggerContent()}
					{#if toShowTitle}
						{toShowTitle}
					{:else}
						<span class="mangaId">{mangaId}</span>
					{/if}
				{/snippet}
			</Tooltip>
		</p>
	</div>
	<div class="groups" use:melt={$root}>
		<p>Scanlation Groups:</p>
		{#each $groups as group}
			<div class="group" use:melt={$tag(group)}>
				<span>{group.value}</span>
				<button use:melt={$deleteTrigger(group)}>
					<XIcon size={"24"} />
				</button>
			</div>
		{/each}
		<FormInput
			element={input}
			inputProps={{
				disabled: mutation.isPending
			}}
		/>
	</div>

	<div class="buttons">
		<PrimaryButtonOnlyLabel
			icon={UploadIcon}
			label="Create session"
			disabled={mutation.isPending}
			onclick={() => {
				mutation.mutate(
					{
						groups: $groups.map((group) => group.id),
						mangaId
					},
					{
						onError(error) {
							addErrorToast("Cannot create internal session", error);
						},
						onSuccess(data) {
							ondone?.(data);
						}
					}
				);
			}}
		/>
	</div>
</div>

{#if $open && !mutation.isPending}
	<div class="menu-outer" use:melt={$menu}>
		<MangaDexVarThemeProvider>
			<menu transition:slide={{ duration: 150, axis: "y" }}>
				{#each groupSearchData as group (group.id)}
					<li
						use:melt={$option({ value: group.id, label: group.value })}
						class:isSelected={$isSelected(group.id)}
					>
						<h4>{group.value}</h4>
					</li>
				{/each}
				{#if !groupSearchQuery.isFetching && groupSearchQuery.hasNextPage}
					<div bind:this={toObserve}></div>
				{/if}
			</menu>
		</MangaDexVarThemeProvider>
	</div>
{/if}

<style lang="scss">
	.groups {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.25em;
		border-radius: 0.25em;
		padding: 5px;
		background-color: var(--accent);
	}
	.edit {
		color: var(--text-color);
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 2px;
		padding-bottom: 2px;
		background-color: var(--accent-l1);
		border-radius: 0.25em;
	}
	.group {
		display: flex;
		gap: 5px;
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 2px;
		padding-bottom: 2px;
		background-color: var(--accent-l1);
		border-radius: 0.25em;
		button {
			transition: background-color 200ms ease-in-out;
			background-color: var(--accent-l3);
			color: var(--text-color);
			font-size: var(--font-size);
			font-family: var(--fonts);
			border: none;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 0.25em;
		}
		button:hover {
			background-color: var(--accent-l3-hover);
		}
		button:active {
			background-color: var(--accent-l3-active);
		}
		span {
			color: var(--text-color);
		}
	}
	.group:hover {
		background-color: var(--accent-l1-hover);
	}
	.group:active {
		background-color: var(--accent-l1-active);
	}
	.menu-outer {
		display: flex;
		flex-direction: column;
		height: 200px;
		z-index: 100;
	}
	menu {
		margin: 0px;
		border-radius: 0.25em;
		list-style: none;
		background-color: var(--accent);
		overflow-y: scroll;
		color: var(--text-color);
		padding-left: 0em;
		li {
			padding-left: 1em;
			transition: background-color 200ms ease-in-out;
			h4 {
				margin: 0px;
			}
		}
		li:global([data-highlighted]) {
			background-color: var(--accent-hover);
		}
		li:not(.isSelected):hover {
			background-color: var(--accent-hover);
		}
		li:not(.isSelected):active {
			background-color: var(--accent-active);
		}
		li.isSelected {
			background-color: var(--primary);
		}
	}
	.title {
		.mangaId {
			text-decoration: underline;
		}
	}
	.buttons {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
