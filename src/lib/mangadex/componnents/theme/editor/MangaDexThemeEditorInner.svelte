<script lang="ts">
	import { getMangaDexThemeContextWritable } from "@mangadex/utils/contexts";
	import Title from "../texts/title/Title.svelte";
	import ColorPickerThemeVarProvider from "./ColorPickerThemeVarProvider.svelte";
	import ColorPicker from "svelte-awesome-color-picker";
	import AccentColorPickers from "./AccentColorPickers.svelte";
	import AccentButtons from "./result/AccentButtons.svelte";
	import MidToneLine from "../lines/MidToneLine.svelte";
	import Buttons from "./result/Buttons.svelte";
	import StatusColorsResult from "./result/StatusColorsResult.svelte";
	import PrimaryButtons from "./result/PrimaryButtons.svelte";
	import IndicationBadges from "./result/IndicationBadges.svelte";
	import DangerButtons from "./result/DangerButtons.svelte";
	const theme = getMangaDexThemeContextWritable();
</script>

<ColorPickerThemeVarProvider>
	<div class="colors">
		<div class="title">
			<Title type={2}>Theme Editor</Title>
			<slot name="profile"></slot>
		</div>
		<div class="main-bg-text">
			<section class="bg">
				<ColorPicker
					position="responsive"
					bind:hex={$theme.mainBackground}
					label="Main Background"
				/>
			</section>
			<section class="text">
				<ColorPicker position="responsive" bind:hex={$theme.textColor} label="Text Color" />
			</section>
			<section class="midtone">
				<ColorPicker position="responsive" bind:hex={$theme.mid_tone} label="Midtone" />
			</section>
		</div>
		<MidToneLine />
		<div class="accents">
			<Title type={3}>Accents</Title>
			<div class="colors-editor">
				<article class="picker">
					<AccentColorPickers title="Default" bind:accent={$theme.accents.default} />
					<AccentColorPickers title="Accent L1" bind:accent={$theme.accents.l1} />
					<AccentColorPickers title="Accent L2" bind:accent={$theme.accents.l2} />
					<AccentColorPickers title="Accent L3" bind:accent={$theme.accents.l3} />
					<AccentColorPickers title="Accent L4" bind:accent={$theme.accents.l4} />
					<AccentColorPickers title="Accent L5" bind:accent={$theme.accents.l5} />
				</article>
				<article class="result">
					<AccentButtons />
				</article>
			</div>
		</div>
		<div class="buttons">
			<Title type={3}>Buttons</Title>
			<div class="colors-editor">
				<article class="picker">
					<ColorPicker
						position="responsive"
						label="Default"
						bind:hex={$theme.button.default}
					/>
					<ColorPicker
						position="responsive"
						label="Alternate"
						bind:hex={$theme.button.alternate}
					/>
				</article>
				<article class="result">
					<Buttons />
				</article>
			</div>
		</div>
		<div class="scrollbar">
			<Title type={3}>Scrollbar</Title>
			<div class="colors-editor">
				<article class="picker">
					<ColorPicker
						position="responsive"
						label="Default"
						bind:hex={$theme.scrollbar.default}
					/>
					<ColorPicker
						position="responsive"
						label="Hovered"
						bind:hex={$theme.scrollbar.hovered}
					/>
				</article>
			</div>
		</div>
		<div class="status">
			<Title type={3}>Status</Title>
			<div class="colors-editor">
				<article class="picker">
					<ColorPicker position="responsive" label="Red" bind:hex={$theme.status.red} />
					<ColorPicker
						position="responsive"
						label="Green"
						bind:hex={$theme.status.green}
					/>
					<ColorPicker
						position="responsive"
						label="Yellow"
						bind:hex={$theme.status.yellow}
					/>
					<ColorPicker position="responsive" label="Blue" bind:hex={$theme.status.blue} />
					<ColorPicker position="responsive" label="Grey" bind:hex={$theme.status.grey} />
					<ColorPicker
						position="responsive"
						label="Purple"
						bind:hex={$theme.status.purple}
					/>
				</article>
				<article class="result">
					<StatusColorsResult />
				</article>
			</div>
		</div>
		<div class="primary">
			<Title type={3}>Primary</Title>
			<div class="colors-editor">
				<article class="picker">
					<ColorPicker
						position="responsive"
						label="Default"
						bind:hex={$theme.primary.primary}
					/>
					<ColorPicker
						position="responsive"
						label="Variant 1"
						bind:hex={$theme.primary.primary1}
					/>
					<ColorPicker
						position="responsive"
						label="Variant 2"
						bind:hex={$theme.primary.primary2}
					/>
				</article>
				<article class="result">
					<PrimaryButtons />
				</article>
			</div>
		</div>
		<div class="indication">
			<Title type={3}>Indication</Title>
			<div class="colors-editor">
				<article class="picker">
					<ColorPicker
						position="responsive"
						label="Blue"
						bind:hex={$theme.indication.blue}
					/>
				</article>
				<article class="result">
					<IndicationBadges />
				</article>
			</div>
		</div>
		<div class="danger">
			<Title type={3}>Danger</Title>
			<div class="colors-editor">
				<article class="picker">
					<ColorPicker
						position="responsive"
						label="Default"
						bind:hex={$theme.danger.default}
					/>
					<ColorPicker
						position="responsive"
						label="Variant 1"
						bind:hex={$theme.danger.l1}
					/>
					<ColorPicker
						position="responsive"
						label="Variant 2"
						bind:hex={$theme.danger.l2}
					/>
				</article>
				<article class="result">
					<DangerButtons />
				</article>
			</div>
		</div>
		<div class="contrast">
			<Title type={3}>Contrast</Title>
			<div class="colors-editor">
				<article class="picker">
					<ColorPicker
						position="responsive"
						label="Variant 1"
						bind:hex={$theme.contrast.l1}
					/>
				</article>
				<article class="result"></article>
			</div>
		</div>
	</div>
</ColorPickerThemeVarProvider>

<style lang="scss">
	.colors-editor {
		display: grid;
		@media (width >= 550px) {
			grid-template-columns: repeat(2, calc(100% / 2));
			gap: 10px;
			.picker {
				border-width: 0px;
				border-right-width: 2px;
				border-color: var(--mid-tone);
				border-style: solid;
			}
		}
		@media (width < 550px) {
			.result {
				display: none;
			}
		}
	}
</style>
