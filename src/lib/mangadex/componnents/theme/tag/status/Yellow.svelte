<script lang="ts">
	import { Badge } from "@svelteuidev/core";
	export let variant: "light" | "filled" | "outline" | "dot" | "gradient" | undefined = undefined;
</script>

<Badge {variant} color={"var(--status-yellow)"} style={"color: var(--text-color)"}>
	<slot />
</Badge>
