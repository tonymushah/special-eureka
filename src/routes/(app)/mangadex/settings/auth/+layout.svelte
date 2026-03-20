<script lang="ts">
	import PageTitle from "@mangadex/componnents/pages/PageTitle.svelte";

	interface Props {
		children?: import("svelte").Snippet;
	}

	let { children }: Props = $props();
</script>

<PageTitle titleType={1} title={"Authentification"} withReturn />

{@render children?.()}
