<script lang="ts">
	import is_tag_danger from "@mangadex/utils/is_tag_danger";
	import { onMount } from "svelte";
	import StatusBadge from "../theme/tag/StatusBadge.svelte";

	export let id: string;
	export let name: string;
	let color: "red" | "gray" = "gray";
	onMount(() => {
		if (is_tag_danger(id)) {
			color = "red";
		}
	});
</script>

<StatusBadge {color}>
	{name}
</StatusBadge>
