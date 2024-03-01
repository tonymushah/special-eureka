<script lang="ts">
	import { open } from "@tauri-apps/api/shell";

	export let href: string;
</script>

<span
	role="link"
	tabindex="0"
	on:keydown={(e) => {
		if (document.activeElement === e.currentTarget) {
			if (e.key == "Enter") {
				open(href);
			}
		}
	}}
	on:click={(e) => {
		open(href);
	}}
>
	<slot />
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
