<script lang="ts">
	import { createDialog, melt } from "@melt-ui/svelte";
	import ButtonAccent from "../theme/buttons/ButtonAccent.svelte";
	import { scrollElementId } from "../layout/scrollElement";
	import { FilterIcon } from "svelte-feather-icons";
	import type { UserLibrarySectionParam } from "@mangadex/gql/graphql";
	import type { Writable } from "svelte/store";
	import { fade } from "svelte/transition";
	import { XIcon as CloseIcon } from "svelte-feather-icons";
	import FilterContent from "./filter/FilterContent.svelte";
	const {
		elements: { trigger, portalled, overlay, content, title, description, close },
		states: { open }
	} = createDialog({
		portal: `#${scrollElementId}`
	});
	interface Props {
		params: Writable<UserLibrarySectionParam>;
	}

	let { params }: Props = $props();
</script>

<ButtonAccent meltElement={trigger}>
	<div class="icon">
		<FilterIcon size="20" />
	</div>
</ButtonAccent>

{#if $open}
	<div class="portalled" use:melt={$portalled}>
		<div
			class="overlay"
			use:melt={$overlay}
			transition:fade={{
				duration: 150
			}}
		></div>
		<div
			class="dialog"
			use:melt={$content}
			transition:fade={{
				duration: 150
			}}
		>
			<div class="content">
				<div class="top">
					<div class="title-desc">
						<h2 use:melt={$title}>Filter Library</h2>
					</div>
					<div class="close">
						<ButtonAccent meltElement={close}>
							<CloseIcon />
						</ButtonAccent>
					</div>
				</div>
				<FilterContent {params} />
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 6px;
	}
	.portalled {
		position: absolute;
		top: 0px;
		width: 100%;
		height: 100%;
	}
	.dialog {
		background-color: var(--main-background);
		color: var(--text-color);
		width: 75vw;
		border: 3px solid var(--primary);
		border-radius: 0.5rem;
		position: fixed;
		z-index: 5;
		transform: translateY(-50%);
		transform: translateX(-50%);
		top: 10vh;
		left: 50%;
		padding: 0.5rem; /* 24px */
		height: 75vh;
	}
	.overlay {
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		z-index: 5;
		inset: 0px;
		position: fixed;
	}
	.content {
		height: 100%;
		display: flex;
		//grid-template-rows: fit-content auto;
		flex-direction: column;
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
			h2 {
				margin: 0px;
			}
		}
	}
</style>
