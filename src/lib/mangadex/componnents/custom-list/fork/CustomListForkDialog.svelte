<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import { createDialog, melt } from "@melt-ui/svelte";
	import { toStore } from "svelte/store";
	import { fade } from "svelte/transition";
	import { XIcon as CloseIcon } from "svelte-feather-icons";
	import { CustomListVisibility } from "@mangadex/gql/graphql";
	import { forkCustomListMutation as forkCustomListMutationLoader } from "@mangadex/gql-docs/list/id/fork";
	import { isLogged } from "@mangadex/utils/auth";
	import FormInput from "@mangadex/componnents/theme/form/input/FormInput.svelte";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";

	interface Props {
		open?: boolean;
		listToFork: string;
		listToForkName?: string;
	}
	let { open: propsOpen = $bindable(), listToFork, listToForkName }: Props = $props();
	const {
		elements: { portalled, overlay, content, title, close },
		states: { open }
	} = createDialog({
		portal: "#mangadex-scroll-container",
		open: toStore(
			() => propsOpen ?? false,
			(v) => {
				propsOpen = v;
			}
		)
	});
	let forkCustomListMutation = forkCustomListMutationLoader();
	let name = $state<string>("");
	let visiblity = $state<CustomListVisibility>();
	let filterTitles = $state(true);
</script>

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
						<h2 use:melt={$title}>
							Fork {#if listToForkName}
								{listToForkName}
							{:else}
								{listToFork} MD List
							{/if}
						</h2>
					</div>
					<div class="close">
						<ButtonAccent meltElement={close}>
							<CloseIcon />
						</ButtonAccent>
					</div>
				</div>
				<div class="body">
					<section>
						MD List id: {listToFork}
					</section>
					<section>
						<label for="fork-name">Name:</label>
						<FormInput
							bind:value={name}
							widthFull
							inputProps={{
								id: "fork-name"
							}}
						/>
					</section>
					<section>
						<p>Visibility</p>
						<div>
							<input
								type="radio"
								value={CustomListVisibility.Public}
								bind:group={visiblity}
								id="vis-public"
							/>
							<label for="vis-public">Public</label>
						</div>
						<div>
							<input
								type="radio"
								value={CustomListVisibility.Private}
								bind:group={visiblity}
								id="vis-private"
							/>
							<label for="vis-private">Private</label>
						</div>
					</section>
					<section>
						<input type="checkbox" bind:checked={filterTitles} />
						<label for="filter-titles">Filter titles </label>
					</section>
					<section class="buttons">
						<PrimaryButton
							onclick={() => {
								forkCustomListMutation.mutate(
									{
										name,
										visibility: visiblity,
										toFork: listToFork,
										filter: filterTitles
									},
									{
										onSuccess(data) {
											addToast({
												data: {
													title: `Forked ${listToForkName ? listToForkName : `${listToFork} MD List`}`,
													description: `New MD List ID: ${data.id}`
												}
											});
											if ($open) {
												goto(
													route("/mangadex/list/[id]", {
														id: data.id
													})
												);
											}
										},
										onError(error) {
											addErrorToast("Cannot fork MD List", error);
										}
									}
								);
							}}
							isBase
							disabled={!$isLogged || forkCustomListMutation.isPending}
						>
							<p class="send">Fork</p>
						</PrimaryButton>
					</section>
				</div>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.buttons {
		display: flex;
		align-items: center;
		justify-content: center;
	}
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
	.body {
		display: grid;
		grid-template-rows: 0fr 0fr 1fr 0fr 61px;
		height: -webkit-fill-available;
		gap: 12px;
		margin: 0px 12px;
	}
</style>
