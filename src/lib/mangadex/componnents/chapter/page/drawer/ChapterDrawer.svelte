<script lang="ts">
	import { derived } from "svelte/store";
	import { isDrawerFixedWritable } from "../contexts/isDrawerFixed";
	import { isDrawerOpenWritable } from "../contexts/isDrawerOpen";
	import ChapterDrawerBase from "./base/ChapterDrawerBase.svelte";
	import { LayersIcon, LockIcon, UnlockIcon, XIcon, ZapOffIcon } from "svelte-feather-icons";
	import ChapterDrawerContent from "./ChapterDrawerContent.svelte";

	const open = isDrawerOpenWritable();
	const fixed = isDrawerFixedWritable();
	const fixed_ = derived(fixed, (f) => !f);
	export let left = false;
</script>

<ChapterDrawerBase bind:open={$open} fixed={$fixed_} bind:left>
	<ChapterDrawerContent bind:left />
	<div class="main" slot="content">
		<slot />
	</div>
</ChapterDrawerBase>

<style lang="scss">
	.main {
		display: content;
	}
</style>
