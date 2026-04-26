<script lang="ts" module>
	import { Context, type Getter } from "runed";

	const CONTEXT_NAME = "IS_SIDEBAR_COLLAPSED";
	const ctt = new Context<{ val: boolean }>(CONTEXT_NAME);
	export function isContextSidebarCollapsed() {
		let val = ctt.getOr({
			val: false
		});
		return {
			get val() {
				return val.val == true;
			}
		};
	}
	export function setContextSidebarCollapsed(collapsed: Getter<boolean>) {
		ctt.set({
			get val() {
				return collapsed();
			}
		});
	}
</script>

<script lang="ts">
	interface Props {
		collapsed?: boolean;
		children?: import("svelte").Snippet;
	}

	let { collapsed = true, children }: Props = $props();
	setContextSidebarCollapsed(() => collapsed);
</script>

{@render children?.()}
