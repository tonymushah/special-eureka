<script lang="ts">
	import FormInput from "@mangadex/componnents/theme/form/input/FormInput.svelte";
	import MangaDexVarThemeProvider from "@mangadex/componnents/theme/MangaDexVarThemeProvider.svelte";
	import { createCombobox, createTagsInput, melt, type Tag } from "@melt-ui/svelte";
	import { debounce, type DebouncedFunc } from "lodash";
	import { onDestroy } from "svelte";
	import { XIcon } from "svelte-feather-icons";
	import { get, writable, type Writable } from "svelte/store";
	import { slide } from "svelte/transition";
	import {
		getMangaSearchAuthorSearchFetcher,
		type AuthorSearchFetcherResultData
	} from "../../contexts/authorArtist";
	import { tagWritableToComboboxOptionWritable } from "./utils";
	import AuthorsSearchSelectMenu from "./AuthorsSearchSelectMenu.svelte";

	interface Props {
		store: Writable<Tag[]>;
	}

	let { store }: Props = $props();
	const {
		elements: { input, menu, option, label },
		states: { open, inputValue, touchedInput },
		helpers: { isSelected }
	} = createCombobox<string, true>({
		selected: tagWritableToComboboxOptionWritable(store),
		forceVisible: true,
		multiple: true,
		positioning: {
			placement: "top",
			fitViewport: true,
			sameWidth: true
			// strategy: "fixed"
		},
		portal: "dialog"
	});
	const {
		elements: { root, tag, deleteTrigger, edit, input: inputTags },
		states: { tags }
	} = createTagsInput({
		tags: store,
		unique: true
	});
	const authorFetch = getMangaSearchAuthorSearchFetcher();
	const currentAuthorSearch = writable<Tag[]>([]);
	let nextFetch: (() => Promise<AuthorSearchFetcherResultData>) | undefined = $state(undefined);
	let hasNext = $derived(nextFetch != undefined && typeof nextFetch == "function");
	const isFetching = writable(false);
	const start: DebouncedFunc<(...args: any) => any> = debounce(() => {
		if (!get(isFetching)) {
			currentAuthorSearch.set([]);
			isFetching.set(true);
			handleASFRDPromise(authorFetch($inputValue));
		}
	}, 350);
	onDestroy(() => {
		start?.cancel();
	});
	const handleASFRDPromise = debounce(async function (
		prom: Promise<AuthorSearchFetcherResultData>
	) {
		await prom
			.then((result) => {
				currentAuthorSearch.update(($as) => {
					return [...$as, ...result.data];
				});
				if (result.hasNext()) {
					nextFetch = () => result.next();
				} else {
					nextFetch = undefined;
				}
			})
			.finally(() => isFetching.set(false));
	}, 300);
	$effect(() => {
		if ($touchedInput) {
			start?.cancel();
			start();
		}
	});
	const next = debounce(function () {
		if (!get(isFetching) && nextFetch != undefined && typeof nextFetch == "function") {
			isFetching.set(true);
			handleASFRDPromise?.(nextFetch());
		}
	}, 300);
	let toObserve: HTMLElement | undefined = $state(undefined);
	const obs_debounce_func = debounce<IntersectionObserverCallback>((entries, obs) => {
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
		handleASFRDPromise.cancel();
	});
	// $: console.debug($tags);
	// $: console.debug(`Is fetching author ${$isFetching}`);
</script>

<div class="layout">
	<div class="root" use:melt={$root}>
		{#each $tags as t}
			<div class="tag" use:melt={$tag(t)}>
				<span>{t.value}</span>
				<button use:melt={$deleteTrigger(t)}>
					<XIcon size={"24"} />
				</button>
			</div>
			<div class="edit" use:melt={$edit(t)}>{t.value}</div>
		{/each}
		<FormInput element={input} />
	</div>
</div>

<AuthorsSearchSelectMenu
	{menu}
	bind:toObserve
	{open}
	{currentAuthorSearch}
	{isFetching}
	{isSelected}
	{option}
	{hasNext}
/>

<style lang="scss">
	.layout {
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: center;
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
	.edit {
		color: var(--text-color);
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 2px;
		padding-bottom: 2px;
		background-color: var(--accent-l1);
		border-radius: 0.25em;
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
