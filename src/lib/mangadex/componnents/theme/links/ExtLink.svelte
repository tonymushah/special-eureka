<script lang="ts">
	import registerContextMenuEvent from "@special-eureka/core/utils/contextMenuContext";
	import { openUrl as open } from "@tauri-apps/plugin-opener";

	interface Props {
		href: string;
		children?: import("svelte").Snippet;
	}

	let { href, children }: Props = $props();
</script>

<span
	role="link"
	tabindex="0"
	onkeydown={(e) => {
		if (document.activeElement === e.currentTarget) {
			if (e.key == "Enter") {
				open(href);
			}
		}
	}}
	onclick={(e) => {
		open(href);
	}}
	oncontextmenu={(e) => {
		e.preventDefault();
	}}
>
	{@render children?.()}
</span>

<style lang="scss">
	span {
		cursor: pointer;
		transition: color 300ms ease-in-out;
		color: var(--primary);
	}
	span:hover {
		color: var(--primary-l1);
		text-decoration: underline;
	}
</style>
