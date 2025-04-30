<script lang="ts" module>
	import { getContext, setContext } from "svelte";

	const CONTEXT_NAME = "IS_SIDEBAR_COLLAPSED";
	export function isContextSidebarCollapsed(): boolean {
		return getContext(CONTEXT_NAME) === true;
	}
	export function setContextSidebarCollapsed(collapsed: boolean = true) {
		setContext(CONTEXT_NAME, collapsed);
	}
</script>

<script lang="ts">
	interface Props {
		collapsed?: boolean;
		children?: import("svelte").Snippet;
	}

	let { collapsed = true, children }: Props = $props();
	setContextSidebarCollapsed(collapsed);
</script>

{@render children?.()}
