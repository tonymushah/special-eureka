<script lang="ts">
	import ButtonBase from "@mangadex/componnents/theme/buttons/base/ButtonBase.svelte";
	import { open } from "@tauri-apps/api/shell";
	import type { Readable } from "svelte/store";
	import Favicon from "./button/Favicon.svelte";

	export let href: string;
	export let title: string;
	export let icon: Readable<string | undefined>;
</script>

<ButtonBase
	on:click={async () => {
		await open(href);
	}}
	--button-color="var(--accent)"
	--button-hover="var(--primary)"
	with_hover
>
	<div>
		<Favicon icon={$icon} alt={href} />
		<span class="title">
			{title}
		</span>
	</div>
</ButtonBase>

<style lang="scss">
	div {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
		margin: 2px;
	}
</style>
