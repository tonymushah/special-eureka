<script lang="ts">
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	import type { Snippet } from "svelte";

	interface Props {
		children?: Snippet;
	}
	let { children }: Props = $props();
</script>

<h1>General Settings</h1>

<AppTitle title="General Settings - MangaDex" />

{@render children?.()}
