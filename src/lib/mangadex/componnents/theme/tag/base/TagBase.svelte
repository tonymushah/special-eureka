<script lang="ts">
	import { Badge } from "@svelteuidev/core";
</script>

<Badge
	style={"font-size: var(--tag-font-size); font-weight: var(--tag-font-weight); background-color: var(--tag-color); color: var(--text-color); font-family: var(--fonts); padding: var(--tag-padding);"}
>
	<slot />
</Badge>
