<script lang="ts">
	import { Badge } from "@svelteuidev/core";
</script>

<Badge
	style={"background-color: var(--indication-blue); color: var(--text-color); font-family: var(--fonts)"}
>
	<slot />
</Badge>
