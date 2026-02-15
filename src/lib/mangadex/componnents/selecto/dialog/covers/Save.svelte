<script lang="ts">
	import {
		CoverImageFormat,
		type CoverArtResizeOption,
		type InputMaybe,
		type CoverArtSaveOption
	} from "@mangadex/gql/graphql";
	import { saveCoversInADirectory } from "@mangadex/utils/covers/save";
	import { isLinuxStore } from "@special-eureka/core/commands/isLinux";
	import { Slider } from "@ark-ui/svelte/slider";
	import cssSliderMod from "@mangadex/componnents/chapter/page/drawer/content/settings/longstrip-image-width.module.scss";
	import PrimaryButtonOnlyLabel from "@mangadex/componnents/theme/buttons/PrimaryButtonOnlyLabel.svelte";
	import { FolderUp, FolderArchive } from "@lucide/svelte";
	import { dev } from "$app/environment";
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import ReadButton from "@mangadex/componnents/manga/page/top-info/buttons/ReadButton.svelte";

	interface Props {
		covers?: string[];
	}
	let { covers = $bindable([]) }: Props = $props();
	let dirMutation = saveCoversInADirectory();
	let imageFormat = $state<CoverImageFormat | undefined>();
	let resize = $state(false);
	let resizeMode = $state<"width" | "height">("width");
	let resizeValue = $state<number>(75);
	let options = $derived.by<InputMaybe<CoverArtSaveOption>>(() => {
		if (resize) {
			let resizePercentage: CoverArtResizeOption;
			switch (resizeMode) {
				case "width":
					resizePercentage = {
						width: resizeValue
					};
					break;
				case "height":
					resizePercentage = {
						height: resizeValue
					};
					break;
			}
			return {
				format: imageFormat,
				resizePercentage
			};
		} else {
			return null;
		}
	});
</script>

<section>
	<h3>Options</h3>
	<div class="options">
		<label for="image-format">Image Format:</label>
		<select
			id="image-format"
			bind:value={imageFormat}
			placeholder="JPEG by default"
			class:isNotLinux={!$isLinuxStore}
		>
			<option value={CoverImageFormat.Avif}>Avif</option>
			<option value={CoverImageFormat.Jpeg}>Jpeg</option>
			<option value={CoverImageFormat.Png}>Png</option>
			<option value={CoverImageFormat.Webp}>Webp</option>
		</select>
		<label for="can-resize-image">Resize Image:</label>
		<input class="resize-check" type="checkbox" id="can-resize-image" bind:checked={resize} />
		{#if resize}
			<label for="resize-mode">Resize Mode:</label>
			<select id="resize-mode" bind:value={resizeMode} class:isNotLinux={!$isLinuxStore}>
				<option value="width">Width</option>
				<option value="height">Height</option>
			</select>
			<label for="resize-value">Resize value ({resizeValue}%):</label>
			<Slider.Root
				id="resize-value"
				class={cssSliderMod.root}
				bind:value={() => [resizeValue], (i) => (resizeValue = i.at(0) ?? 0)}
			>
				<div class="slider-root">
					<Slider.Control class={cssSliderMod.sliderContainer}>
						<Slider.Track class={cssSliderMod.sliderRangeOuter}>
							<Slider.Range class={cssSliderMod.sliderRange} />
						</Slider.Track>
						<Slider.Thumb index={0} class={cssSliderMod.sliderThumbs}>
							<Slider.HiddenInput />
						</Slider.Thumb>
					</Slider.Control>
				</div>
			</Slider.Root>
		{/if}
	</div>
	<div class="actions">
		<PrimaryButtonOnlyLabel
			icon={FolderUp}
			label="Save images in a new directory"
			disabled={dirMutation.isPending}
			onclick={() => {
				dirMutation.mutate({
					ids: covers,
					option: options
				});
			}}
		/>
		{#if dev}
			<ButtonAccentOnlyLabel icon={FolderArchive} label="Save images in a archive" />
		{/if}
	</div>
</section>

<style lang="scss">
	h3 {
		margin: 0px;
	}
	.options {
		display: grid;
		grid-template-columns: auto 1fr;
		column-gap: 10px;
		align-items: center;
	}
	select {
		background-color: var(--accent-l1);
		border-radius: 6px;
		border: 3px solid var(--mid-tone);
		font-family: inherit;
	}
	select.isNotLinux {
		color: var(--text-color);
	}
	.resize-check {
		width: 20px;
		height: 20px;
	}
	.slider-root {
		position: relative;
		display: flex;
		height: 20px;
		width: 90%;
		align-items: center;
	}
	.actions {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 16px;
	}
</style>
