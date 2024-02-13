<script lang="ts">
	import { Badge, createStyles } from "@svelteuidev/core";
	export let variant: "light" | "filled" | "outline" | "dot" | "gradient" | undefined = "filled";
</script>

<Badge
	{variant}
	style={"background-color: var(--status-gray); color: var(--text-color); font-family: var(--fonts)"}
>
	<slot />
</Badge>
