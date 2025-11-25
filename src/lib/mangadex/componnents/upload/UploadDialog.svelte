<script lang="ts">
	import { createDialog, melt } from "@melt-ui/svelte";
	import { XIcon as CloseIcon } from "svelte-feather-icons";
	import { toStore } from "svelte/store";
	import ButtonAccent from "../theme/buttons/ButtonAccent.svelte";
	import { fade } from "svelte/transition";
	import UploadDialogBody from "./dialog/UploadDialogBody.svelte";
	import type { PortalConfig } from "@melt-ui/svelte/internal/actions";

	interface Props {
		mangaId: string;
		title?: string;
		ondone?: (sessionId: string) => void;
		open?: boolean;
	}
	let { mangaId, title: propsTitle, open: propsOpen = $bindable(), ondone }: Props = $props();
	const {
		elements: { portalled, overlay, content, title, description, close },
		states: { open }
	} = createDialog({
		portal: "#mangadex-scroll-container",
		open: toStore(
			() => propsOpen ?? false,
			(inner) => {
				propsOpen = inner;
			}
		)
	});
	let bodyPortal: PortalConfig | undefined = $state();
</script>

{#if $open}
	<div use:melt={$portalled} class="portalled">
		<div use:melt={$overlay} class="overlay" transition:fade={{ duration: 150 }}></div>
		<div
			class="dialog"
			use:melt={$content}
			transition:fade={{
				duration: 150
			}}
			bind:this={bodyPortal}
		>
			<div class="content">
				<div class="top">
					<div class="title-desc">
						<h2 use:melt={$title}>Create an upload session</h2>
						{#if propsTitle}
							<p use:melt={$description}>for `{propsTitle}`</p>
						{/if}
					</div>
					<div class="close">
						<ButtonAccent meltElement={close}>
							<CloseIcon />
						</ButtonAccent>
					</div>
				</div>
				<UploadDialogBody
					{mangaId}
					ondone={(sessionId) => {
						ondone?.(sessionId);
					}}
					portal={bodyPortal}
				/>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.portaled {
		position: absolute;
		top: 0px;
		width: 100%;
		height: 100%;
	}
	.dialog {
		background-color: var(--main-background);
		color: var(--text-color);
		width: 50vw;
		border: 3px solid var(--primary);
		border-radius: 0.5rem;
		position: fixed;
		z-index: 50;
		transform: translateY(-50%);
		transform: translateX(-50%);
		top: 10vh;
		left: 50%;
		padding: 0.5rem; /* 24px */
		max-height: 75vh;
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
	.overlay {
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		z-index: 50;
		inset: 0px;
		position: fixed;
	}
	.top {
		justify-content: space-between;
		display: flex;
		.title-desc {
			display: grid;
			h2 {
				margin: 0px;
			}
		}
		p {
			margin: 0px;
			font-weight: 800;
			font-size: large;
		}
	}
</style>
