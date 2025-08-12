<script lang="ts">
	import type { LayoutData } from "./$types";
	import PostLayout from "./PostLayout.svelte";

	interface Props {
		data: LayoutData;
		children?: import("svelte").Snippet;
	}

	let { data = $bindable(), children }: Props = $props();
	function isLayoutDataValid({ data, pages, currentPage }: LayoutData): boolean {
		if (data != null && data != undefined && pages != undefined && currentPage != undefined) {
			return true;
		}
		return false;
	}
	let isDataValid = $derived(isLayoutDataValid(data));
</script>

{#if isDataValid}
	<PostLayout bind:data>
		{@render children?.()}
	</PostLayout>
{:else}
	<article>
		<h2>We're loading the page...</h2>
		<p>probably...</p>
		<p>Try to reload the window (if you can)</p>
		<section class="explaination">
			<h3>What happened??</h3>
			<p>
				It happens when the Svelte Kit Layout Load function returns an empty object instead
				(even though it shouldn't return that)
			</p>
			<p class="hate-js">And that's why I hate JS.</p>
			<p>
				Anyway, this normally occurs frequently in dev mode but if you got this message in a
				production build, feel free to make a pull request to fix it :D
			</p>
		</section>
	</article>
{/if}

<style lang="scss">
	article {
		margin: 10px;
	}
	.explaination {
		.hate-js {
			font-style: italic;
		}
	}
</style>
