<script lang="ts">
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";
	import TimeAgo from "@mangadex/componnents/TimeAgo.svelte";
	import Tooltip from "@mangadex/componnents/Tooltip.svelte";
	import { ContextMenuItemProvider } from "@special-eureka/core/commands/contextMenu";
	import openNewWindow from "@special-eureka/core/commands/openNewWindow";
	import registerContextMenuEvent from "@special-eureka/core/utils/contextMenuContext";
	import { openUrl } from "@tauri-apps/plugin-opener";

	interface Props {
		id: string;
		name: string;
		insertDate?: string | null;
		remove?: () => void;
		disabled?: boolean;
	}
	let { id, name, insertDate, remove, disabled }: Props = $props();
	let _date = $derived.by(() => {
		try {
			if (insertDate) {
				return new Date(insertDate);
			} else {
				return new Date();
			}
		} catch {
			return new Date();
		}
	});
</script>

<tr
	class:disabled
	tabindex="0"
	onclick={() => {
		if (!disabled) remove?.();
	}}
	aria-disabled={disabled}
	oncontextmenu={registerContextMenuEvent({
		addSeparator: false,
		stopPropagation: true,
		includeContext: true,
		preventDefault: true,
		additionalMenus() {
			return [
				ContextMenuItemProvider.menuItem({
					text: "Open author info",
					action() {
						goto(
							route("/mangadex/author/[id]", {
								id
							})
						);
					}
				}),
				ContextMenuItemProvider.menuItem({
					text: "Open author info in a new window",
					action() {
						openNewWindow(
							route("/mangadex/author/[id]", {
								id
							})
						);
					}
				}),
				ContextMenuItemProvider.menuItem({
					text: "Open author info in the browser",
					action() {
						openUrl(`https://mangadex.org/author/${id}`);
					}
				}),
				ContextMenuItemProvider.seperator(),
				ContextMenuItemProvider.menuItem({
					text: "Remove",
					action() {
						remove?.();
					},
					enabled: !disabled && remove != undefined
				})
			];
		}
	})}
>
	<td>{id}</td>
	<td>{name}</td>
	<td>
		<Tooltip>
			{#snippet tooltipContent()}
				{_date}
			{/snippet}
			{#snippet triggerContent()}
				<TimeAgo date={_date} asDateUTC />
			{/snippet}
		</Tooltip>
	</td>
</tr>

<style lang="scss">
	tr:focus {
		background-color: var(--accent-l5);
	}
	tr:hover {
		background-color: var(--accent-l5-hover);
	}
	tr:active {
		background-color: var(--accent-l5-active);
	}
	tr.disabled {
		cursor: not-allowed;
		background-color: var(--accent-l1);
	}
	td {
		border-bottom: 3px solid var(--midtone);
	}
</style>
