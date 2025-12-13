<script lang="ts">
	import { queueEntryState } from "@mangadex/stores/upload/queue";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import Tooltip from "../Tooltip.svelte";

	interface Props extends Omit<HTMLButtonAttributes, "children"> {
		queueId: string;
		highlighted?: boolean;
		clicked?: boolean;
		selected?: boolean;
		index?: number;
	}

	let { queueId, highlighted, selected, index, ...restProps }: Props = $props();
	const _queueState = queueEntryState(queueId);
	let queueState = $derived($_queueState);
</script>

<button
	{...restProps}
	class:selected
	class:highlighted
	class:not-there={queueState == null}
	class:loading-state={queueState == undefined}
	class:pending={queueState?.state == "Pending"}
	class:uploading={queueState?.state == "Uploading"}
	class:error={queueState?.state == "Error"}
	data-queue-id={queueId}
>
	{#if typeof index == "number"}
		<span>({index})</span>
	{/if}
	<span>{queueId}</span>
	-
	<span>
		{#if queueState == null}
			Not there??
		{:else if queueState == undefined}
			Loading
		{:else if queueState.state == "Pending"}
			Pending
		{:else if queueState.state == "Uploading"}
			Uploading
		{:else if queueState.state == "Error"}
			{@const error = queueState.error}
			{@const errorCode = error.graphQLErrors.at(0)?.extensions["code"]}
			<Tooltip>
				{#snippet triggerContent()}
					Error (code: {errorCode})
				{/snippet}
				{#snippet tooltipContent()}
					<p class="err-msg">{error.message}</p>
				{/snippet}
			</Tooltip>
		{/if}
	</span>
</button>

<style lang="scss">
	button {
		border: 1px solid var(--mid-tone);
		border-radius: 3px;
		background-color: var(--accent-l1);
		transition: none;
		color: var(--text-color);
	}
	button:hover {
		background-color: var(--accent-l1-hover);
	}
	button:focus {
		border-color: var(--status-gray);
	}
	button:active {
		background-color: var(--accent-l1-active);
	}
	.uploading {
		border-color: var(--status-green);
	}
	.error {
		border-color: var(--danger-l1);
	}
	.highlighted {
		background-color: var(--accent-l5);
	}
	.not-there {
		border-color: var(--status-gray);
	}
	.loading-state {
		border-color: var(--status-gray);
	}
	button:disabled {
		border-color: var(--contrast-l1);
		background-color: var(--accent);
	}
	.selected {
		background-color: var(--primary-l2);
	}
	.selected:hover {
		background-color: var(--primary-l1);
	}
	.selected:active {
		background-color: var(--primary);
	}
	.err-msg {
		max-width: 300px;
	}
</style>
