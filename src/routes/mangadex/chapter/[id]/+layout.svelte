<script lang="ts">
	import type { LayoutData } from "./$types";
	import PostLayout from "./PostLayout.svelte";

	export let data: LayoutData;
</script>

{#if data != null && data != undefined}
	<PostLayout bind:data>
		<slot />
	</PostLayout>
{:else}
	<article>
		<h2>We're loading the page...</h2>
		<p>probably...</p>
	</article>
{/if}
