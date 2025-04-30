<script lang="ts">
	import { preventDefault } from "svelte/legacy";

	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import FormInput from "@mangadex/componnents/theme/form/input/FormInput.svelte";
	import { ArchiveIcon, FilterIcon, SearchIcon } from "svelte-feather-icons";
	import type { MangaSearchParams } from "./state";
	import defaultMangaSearchParams from "./state";
	import { derived, writable, type Writable } from "svelte/store";
	import { init as initFilterContext, type MangaSearchFilterParams } from "./filter/contexts";
	import MangaSearchFilterDialog from "./filter/MangaSearchFilterDialog.svelte";
	import { createEventDispatcher, onDestroy } from "svelte";
	import type { UnlistenFn } from "@tauri-apps/api/event";
	interface Props {
		realTime?: boolean;
		defaultParams?: MangaSearchParams;
	}

	let {
		realTime = $bindable(false),
		defaultParams = $bindable(defaultMangaSearchParams())
	}: Props = $props();
	let dialog_bind: HTMLDialogElement | undefined = $state(undefined);
	const params = writable(defaultParams);
	const titleParams: Writable<string | undefined> = (() => {
		const title_params_derived = derived(params, ($p) => $p.title);
		return {
			subscribe(run, invalidate) {
				return title_params_derived.subscribe(run, invalidate);
			},
			set(value) {
				params.update((inner) => {
					inner.title = value;
					return inner;
				});
			},
			update(updater) {
				params.update((inner) => {
					inner.title = updater(inner.title);
					return inner;
				});
			}
		};
	})();
	const offlineParams: Writable<boolean> = (() => {
		const offline_params_derived = derived(params, ($p) => $p.offlineOnly);
		return {
			subscribe(run, invalidate) {
				return offline_params_derived.subscribe(run, invalidate);
			},
			set(value) {
				params.update((inner) => {
					inner.offlineOnly = value;
					return inner;
				});
			},
			update(updater) {
				params.update((inner) => {
					inner.offlineOnly = updater(inner.offlineOnly);
					return inner;
				});
			}
		};
	})();
	$effect(() => {
		params.set(defaultParams);
	});
	const dispatch = createEventDispatcher<{
		submit: MangaSearchParams;
		change: MangaSearchParams;
	}>();
	initFilterContext(
		(() => {
			const params_derived = derived(params, ($p) => $p.filter);
			return {
				subscribe(run, invalidate) {
					return params_derived.subscribe(run, invalidate);
				},
				set(value) {
					params.update((inner) => {
						inner.filter = value;
						return inner;
					});
				},
				update(updater) {
					params.update((inner) => {
						inner.filter = updater(inner.filter);
						return inner;
					});
				}
			} satisfies Writable<MangaSearchFilterParams>;
		})()
	);
	let unlistens: UnlistenFn[] = [];
	onDestroy(() => {
		unlistens.forEach((u) => {
			u();
		});
	});
	unlistens.push(
		params.subscribe((p) => {
			dispatch("change", p);
		})
	);
</script>

<form
	onsubmit={preventDefault(() => {
		dispatch("submit", $params);
	})}
>
	<div class="input">
		<FormInput
			inputProps={{
				name: "title"
			}}
			widthFull
			bind:value={$titleParams}
		/>
	</div>
	<div class="buttons">
		<ButtonAccent
			variant="accent"
			isBase
			onclick={() => {
				dialog_bind?.showModal();
			}}
		>
			<div class="icons">
				<FilterIcon />
			</div>
		</ButtonAccent>
	</div>
	<div class="buttons">
		{#if $offlineParams}
			<PrimaryButton
				variant="1"
				isBase
				onclick={() => {
					$offlineParams = !$offlineParams;
				}}
			>
				<div class="icons">
					<ArchiveIcon />
				</div>
			</PrimaryButton>
		{:else}
			<ButtonAccent
				variant="accent"
				isBase
				onclick={() => {
					$offlineParams = !$offlineParams;
				}}
			>
				<div class="icons">
					<ArchiveIcon />
				</div>
			</ButtonAccent>
		{/if}
	</div>
	<article
		class="buttons"
		oncontextmenu={preventDefault(() => {
			realTime = !realTime;
		})}
	>
		{#if realTime}
			<ButtonAccent variant="accent" isBase type="submit">
				<div class="icons">
					<SearchIcon />
				</div>
			</ButtonAccent>
		{:else}
			<PrimaryButton variant="1" isBase type="submit">
				<div class="icons">
					<SearchIcon />
				</div>
			</PrimaryButton>
		{/if}
	</article>
</form>

<MangaSearchFilterDialog
	bind:dialog_bind
	requireValidation={!realTime}
	on:validate={() => {
		dialog_bind?.close();
		dispatch("submit", $params);
	}}
/>

<style lang="scss">
	.icons {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	form {
		display: flex;
		flex-direction: row;
		gap: 10px;
		.input {
			display: flex;
			flex-grow: 4;
		}
	}
</style>
