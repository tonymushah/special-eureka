<script lang="ts">
	import { Badge } from "@svelteuidev/core";
</script>

<Badge
	style={"background-color: var(--tag-color); color: var(--text-color); font-family: var(--fonts)"}
>
	<slot />
</Badge>
