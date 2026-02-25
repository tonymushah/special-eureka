<script lang="ts">
	import FormInput from "@mangadex/componnents/theme/form/input/FormInput.svelte";
	import type { Tag } from "@mangadex/utils/legacy/melt-ui-tag.ts";
	import { debounce } from "lodash";
	import { onDestroy } from "svelte";
	import { XIcon } from "@lucide/svelte";
	import { type Writable } from "svelte/store";
	import AuthorsSearchSelectMenu from "./AuthorsSearchSelectMenu.svelte";
	import { floatingUImenu } from "@mangadex/utils/floating-ui/menu.svelte";
	import { createInfiniteQuery } from "@tanstack/svelte-query";
	import pageLimit from "@mangadex/stores/page-limit";
	import { getContextClient } from "@urql/svelte";
	import executeSearchQuery from "@mangadex/routes/author/(search)/search";

	interface Props {
		store: Writable<Tag[]>;
	}

	let { store: tags }: Props = $props();
	let touchedInput = $state(false);
	let inputValue = $state("");
	let menu = $state<HTMLElement | undefined>();
	let trigger = $state<HTMLElement | undefined>();
	let shouldOpen = $derived(touchedInput);
	floatingUImenu({
		menuElement: () => menu,
		triggerElement: () => trigger,
		open: () => shouldOpen,
		closeOnClick: true,
		sameWidth: true,
		setOpen: (o) => (shouldOpen = o),
		showMenuDisplay: "flex"
	});
	const client = getContextClient();
	let authorSearchQuery = createInfiniteQuery(() => ({
		queryKey: ["author-quick-search", `name:${inputValue}`],
		async queryFn({ pageParam }) {
			const res = await executeSearchQuery(client, {
				limit: pageParam.limit,
				offset: pageParam.offset,
				name: pageParam.inputValue.length == 0 ? undefined : pageParam.inputValue
			});
			return {
				data: res.data,
				...res.paginationData
			};
		},

		initialPageParam: {
			inputValue,
			offset: 0,
			limit: $pageLimit
		},
		getNextPageParam(lastPage, allPages, lastPageParam) {
			const next_offset = lastPage.limit + lastPage.offset;
			if (next_offset > lastPage.total) {
				return null;
			} else {
				return {
					...lastPageParam,
					limit: lastPage.limit,
					offset: next_offset
				};
			}
		},
		enabled: touchedInput && inputValue.length != 0
	}));

	let currentAuthorSearch = $derived<Tag[]>(
		authorSearchQuery.data?.pages.flatMap((p) =>
			p.data.map((a) => ({
				id: a.id,
				value: a.name
			}))
		) ?? []
	);
	let hasNext = $derived(authorSearchQuery.hasNextPage);

	const next = debounce(function () {
		authorSearchQuery.fetchNextPage();
	}, 300);
	let toObserve: HTMLElement | undefined = $state(undefined);
	const obs_debounce_func = debounce<IntersectionObserverCallback>((entries) => {
		entries.forEach((entry) => {
			if (entry.intersectionRatio <= 0) return;
			next();
		});
	}, 500);

	const obs = new IntersectionObserver(
		(entries, obs_) => {
			obs_debounce_func.cancel();
			obs_debounce_func(entries, obs_);
		},
		{
			threshold: 0.2
		}
	);
	$effect(() => {
		if (toObserve) {
			obs.unobserve(toObserve);
			obs.observe(toObserve);
		}
	});
	onDestroy(() => {
		obs.disconnect();
		next.cancel();
	});
	// $: console.debug($tags);
	// $: console.debug(`Is fetching author ${$isFetching}`);
</script>

<div class="layout">
	<div class="root" bind:this={trigger}>
		{#each $tags as t}
			<div class="tag">
				<span>{t.value}</span>
				<button>
					<XIcon size={"24"} />
				</button>
			</div>
		{/each}
		<FormInput
			bind:value={inputValue}
			inputProps={{
				onfocus() {
					touchedInput = true;
				},
				onblur() {
					touchedInput = false;
				}
			}}
		/>
	</div>

	<AuthorsSearchSelectMenu
		bind:menu
		bind:toObserve
		open={shouldOpen}
		{currentAuthorSearch}
		isFetching={authorSearchQuery.isFetching}
		{hasNext}
		{tags}
	/>
</div>

<style lang="scss">
	.layout {
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: center;
		position: relative;
	}
	.root {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.25em;
		border-radius: 0.25em;
		padding: 5px;
		background-color: var(--accent);
	}
	.tag {
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
	.tag:hover {
		background-color: var(--accent-l1-hover);
	}
	.tag:active {
		background-color: var(--accent-l1-active);
	}
</style>
