<script lang="ts">
	import ButtonAccent from "../theme/buttons/ButtonAccent.svelte";
	import { makeScroll, preventScroll } from "../layout/scrollElement";
	import { Filter } from "@lucide/svelte";
	import type { UserLibrarySectionParam } from "@mangadex/gql/graphql";
	import type { Writable } from "svelte/store";
	import { XIcon as CloseIcon } from "@lucide/svelte";
	import FilterContent from "./filter/FilterContent.svelte";
	import { Dialog } from "@ark-ui/svelte/dialog";
	import { Portal } from "@ark-ui/svelte";
	import cssDialogMod from "@mangadex/componnents/theme/dialog/dialog.module.scss";
	import cssMod from "./lib-content-filter.module.scss";
	import MangaDexThemeProvider from "../theme/MangaDexThemeProvider.svelte";
	import MangaDexVarThemeProvider from "../theme/MangaDexVarThemeProvider.svelte";

	interface Props {
		params: Writable<UserLibrarySectionParam>;
	}
	let { params }: Props = $props();
	let open = $state(false);
	$effect(() => {
		if (open) {
			preventScroll();
		} else {
			makeScroll();
		}
	});
</script>

<ButtonAccent
	onclick={() => {
		open = !open;
	}}
>
	<div class="icon">
		<Filter size="24" />
	</div>
</ButtonAccent>

<Dialog.Root bind:open>
	<Portal>
		<MangaDexVarThemeProvider>
			<Dialog.Backdrop class={cssMod.overlay} />
			<Dialog.Positioner>
				<Dialog.Content class={cssMod.dialog}>
					<div class="content">
						<div class="top">
							<div class="title-desc">
								<Dialog.Title class={cssDialogMod.title}>Filter Library</Dialog.Title>
							</div>
							<div class="close">
								<Dialog.CloseTrigger class={cssDialogMod.closeButton}>
									<CloseIcon class={cssMod.icon} />
								</Dialog.CloseTrigger>
							</div>
						</div>
						<FilterContent {params} />
					</div>
				</Dialog.Content>
			</Dialog.Positioner>
		</MangaDexVarThemeProvider>
	</Portal>
</Dialog.Root>

<style lang="scss">
	.content {
		height: 100%;
		display: flex;
		//grid-template-rows: fit-content auto;
		flex-direction: column;
	}
	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.close {
		align-items: center;
		display: flex;
		justify-content: center;
	}
	.top {
		justify-content: space-between;
		display: flex;
		padding: 8px;
		.title-desc {
			display: grid;
		}
	}
</style>
