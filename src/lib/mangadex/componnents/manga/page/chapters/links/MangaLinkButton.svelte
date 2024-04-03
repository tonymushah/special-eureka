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
	--button-color="var(--accent-l2)"
	--button-hover="var(--primary)"
>
	<div>
		<Favicon icon={$icon} alt={href} />
		{title}
	</div>
</ButtonBase>

<style lang="scss">
	div {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
		margin: 2px;
		font-weight: 700;
	}
</style>
