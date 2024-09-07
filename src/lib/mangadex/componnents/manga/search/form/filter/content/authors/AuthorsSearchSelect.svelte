<script lang="ts" context="module">
	function tagToComboboxOption(tag: Tag): ComboboxOption<string> {
		return {
			value: tag.id,
			label: tag.value
		};
	}
	function comboBoxOptionToTag(option: ComboboxOption<string>): Tag {
		return {
			value: option.label ?? option.value,
			id: option.value
		};
	}
	function tagWritableToComboboxOptionWritable(
		store: Writable<Tag[]>
	): Writable<ComboboxOption<string>[]> {
		const derived_ = derived(store, ($s) => {
			return $s.map((v) => tagToComboboxOption(v));
		});
		return {
			subscribe(run, invalidate) {
				return derived_.subscribe(run, invalidate);
			},
			set(value) {
				store.set(value.map((v) => comboBoxOptionToTag(v)));
			},
			update(updater) {
				store.update((inner) => {
					return updater(inner.map((v) => tagToComboboxOption(v))).map((v) =>
						comboBoxOptionToTag(v)
					);
				});
			}
		};
	}
</script>

<script lang="ts">
	import {
		createCombobox,
		createTagsInput,
		melt,
		type ComboboxOption,
		type Tag
	} from "@melt-ui/svelte";
	import { derived, get, writable, type Writable } from "svelte/store";
	import {
		getMangaSearchAuthorSearchFetcher,
		type AuthorSearchFetcherResultData
	} from "../../contexts/authorArtist";
	import FormInput from "@mangadex/componnents/theme/form/input/FormInput.svelte";
	import MangaDexVarThemeProvider from "@mangadex/componnents/theme/MangaDexVarThemeProvider.svelte";
	import { slide } from "svelte/transition";
	import { XIcon } from "svelte-feather-icons";
	import { debounce, type DebouncedFunc } from "lodash";
	import { onDestroy } from "svelte";

	export let store: Writable<Tag[]>;
	const {
		elements: { input, menu, option, label },
		states: { open, inputValue, touchedInput },
		helpers: { isSelected }
	} = createCombobox<string, true>({
		selected: tagWritableToComboboxOptionWritable(store),
		forceVisible: true,
		multiple: true
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
	let nextFetch: (() => Promise<AuthorSearchFetcherResultData>) | undefined = undefined;
	$: hasNext = nextFetch != undefined && typeof nextFetch == "function";
	const isFetching = writable(false);
	let debounceFunc: DebouncedFunc<(...args: any) => any> | undefined = undefined;
	onDestroy(() => {
		debounceFunc?.cancel();
	});
	async function handleASFRDPromise(prom: Promise<AuthorSearchFetcherResultData>) {
		await prom
			.then((result) => {
				currentAuthorSearch.update(($as) => {
					return [...$as, ...result.data];
				});
				if (result.hasNext()) {
					nextFetch = result.next;
				} else {
					nextFetch = undefined;
				}
			})
			.finally(() => isFetching.set(false));
	}
	$: {
		if ($touchedInput) {
			debounceFunc?.cancel();
			debounceFunc = debounce(() => {
				if (!get(isFetching)) {
					console.log("should fetch");
					currentAuthorSearch.set([]);
					$isFetching = true;
					handleASFRDPromise(authorFetch($inputValue));
				}
			}, 350);
			debounceFunc();
		}
	}
	function next() {
		debounceFunc?.cancel();
		debounceFunc = debounce(() => {
			if (!$isFetching && nextFetch != undefined && typeof nextFetch == "function") {
				$isFetching = true;
				handleASFRDPromise(nextFetch());
			}
		}, 350);
		debounceFunc();
	}
	$: console.debug($tags);
	$: console.debug(`Is fetching author ${$isFetching}`);
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

{#if $open}
	<div class="menu-outer" use:melt={$menu}>
		<MangaDexVarThemeProvider>
			<menu transition:slide={{ duration: 150, axis: "y" }}>
				{#each $currentAuthorSearch as author (author.id)}
					<li
						use:melt={$option({ value: author.id, label: author.value })}
						class:isSelected={$isSelected(author.id)}
					>
						<h4>{author.value}</h4>
					</li>
				{/each}
			</menu>
		</MangaDexVarThemeProvider>
	</div>
{/if}

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
	.menu-outer {
		display: flex;
		flex-direction: column;
		height: 200px;
	}
	menu {
		margin: 0px;
		border-radius: 0.25em;
		list-style: none;
		background-color: var(--accent);
		z-index: 10;
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
		li[data-highlighted] {
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
</style>
