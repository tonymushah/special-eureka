<script lang="ts">
	import type { Accent } from "@mangadex/theme";
	import Title from "../texts/title/Title.svelte";
	import ColorPicker from "svelte-awesome-color-picker";

	export let accent: Accent;
	export let title: string;
</script>

<section>
	<Title type={4}>{title}</Title>
	<div class="colors-picker">
		<ColorPicker label="Default" bind:hex={accent.default} />
		<ColorPicker label="Hover" bind:hex={accent.hover} />
		<ColorPicker label="Active" bind:hex={accent.active} />
	</div>
</section>
