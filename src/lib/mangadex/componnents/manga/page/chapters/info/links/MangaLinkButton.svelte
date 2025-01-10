<script lang="ts">
	import ButtonBase from "@mangadex/componnents/theme/buttons/base/ButtonBase.svelte";
	import { openUrl as open } from "@tauri-apps/plugin-opener";
	import type { Readable } from "svelte/store";
	import Favicon from "./button/Favicon.svelte";

	interface Props {
		href: string;
		title: string;
		icon: Readable<string | undefined>;
	}

	let { href, title, icon }: Props = $props();
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
		span {
			text-wrap: nowrap;
		}
	}
</style>
