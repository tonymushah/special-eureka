<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import TagBase from "../base/TagBase.svelte";

	interface Props extends HTMLButtonAttributes {}

	let { ...restProps }: Props = $props();
</script>

<TagBase --tag-color="var(--indication-blue)" {...restProps} />
