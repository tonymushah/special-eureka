<script lang="ts">
	import type { Accent } from "@mangadex/theme";
	import Title from "../texts/title/Title.svelte";
	import ColorPicker from "svelte-awesome-color-picker";

	interface Props {
		accent: Accent;
		title: string;
	}

	let { accent = $bindable(), title }: Props = $props();
</script>

<section>
	<Title type={4}>{title}</Title>
	<div class="colors-picker">
		<ColorPicker position="responsive" label="Default" bind:hex={accent.default} />
		<ColorPicker position="responsive" label="Hover" bind:hex={accent.hover} />
		<ColorPicker position="responsive" label="Active" bind:hex={accent.active} />
	</div>
</section>
