<script lang="ts">
	import { Tabs } from "@svelteuidev/core";
	export let position: "left" | "right" | "center" | "apart" = "left";
	export let orientation: "horizontal" | "vertical" = "horizontal";
	export let className: string | undefined = undefined;
</script>

<Tabs variant="unstyled" {className} {position} {orientation}>
	<slot />
</Tabs>
