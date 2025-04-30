<script lang="ts">
	import millify from "millify";
	import CommentsIcon from "./comments/CommentsIcon.svelte";

	interface Events {
		onclick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement;
			}
		) => any;
	}

	interface Props extends Events {
		comments: number;
	}

	let { comments, onclick }: Props = $props();
	let isMillify = $state(false);
	let comments_ = $derived(isMillify ? millify(comments) : comments);
</script>

<button
	class="comments"
	onmouseenter={() => {
		isMillify = false;
	}}
	onmouseleave={() => {
		isMillify = true;
	}}
	onclick={(e) => {
		onclick?.(e);
	}}
>
	<CommentsIcon />
	<span>{comments_}</span>
</button>

<style lang="scss">
	.comments {
		display: flex;
		background-color: var(--main-background);
		color: var(--text-color);
		font-family: var(--fonts);
		font-size: var(--font-size);
		border: none;
		border-radius: 0.25em;
		gap: 5px;
		justify-content: center;
		align-items: center;
		transition: background-color 200ms ease-in-out;
		span {
			font-weight: 600;
		}
	}
	.comments:hover {
		background-color: var(--contrast-l1);
	}
	.comments:active {
		background-color: var(--primary);
	}
</style>
