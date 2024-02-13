<script lang="ts">
	import { Badge } from "@svelteuidev/core";
	export let variant: "light" | "filled" | "outline" | "dot" | "gradient" | undefined = undefined;
</script>

<Badge
	{variant}
	style={"background-color: var(--status-yellow); color: var(--text-color); font-family: var(--fonts)"}
>
	<slot />
</Badge>
