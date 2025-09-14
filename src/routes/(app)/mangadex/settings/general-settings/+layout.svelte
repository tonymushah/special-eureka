<script lang="ts">
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	import type { Snippet } from "svelte";

	interface Props {
		children?: Snippet;
	}
	let { children }: Props = $props();
</script>

<h2>General Settings</h2>

<AppTitle title="General Settings - MangaDex" />

{@render children?.()}

<style lang="scss">
	h2 {
		text-decoration: underline;
	}
</style>
