<script lang="ts">
	import PageTitle from "@mangadex/componnents/pages/PageTitle.svelte";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	import type { Snippet } from "svelte";

	interface Props {
		children?: Snippet;
	}
	let { children }: Props = $props();
</script>

<PageTitle title="General Settings" titleType={1} withReturn />

<AppTitle title="General Settings - MangaDex" />

{@render children?.()}
