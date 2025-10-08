<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		children?: Snippet;
	}
	let { children }: Props = $props();
</script>

<div class="table-container">
	<table>
		{@render children?.()}
	</table>
</div>

<style lang="scss">
	table {
		border: 3px solid var(--mid-tone);
		border-collapse: collapse;
		:global(thead) {
			:global(tr) {
				:global(th) {
					border: 3px solid var(--mid-tone);
					padding: 1px 8px;
					text-align: center;
				}
			}
		}
		:global(tbody) {
			:global(tr) {
				:global(td) {
					border-right: 3px solid var(--mid-tone);
				}
			}
		}
		:global(tfoot) {
			:global(tr) {
				:global(td) {
					border: 3px solid var(--mid-tone);
				}
			}
		}
	}
	.table-container {
		display: inline-flex;
		overflow: hidden;
		border-radius: 0.25em;
	}
</style>
