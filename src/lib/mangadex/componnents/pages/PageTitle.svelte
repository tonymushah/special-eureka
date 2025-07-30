<script lang="ts">
	import { ChevronRightIcon } from "svelte-feather-icons";
	import ButtonAccent from "../theme/buttons/ButtonAccent.svelte";
	import Title from "../theme/texts/title/Title.svelte";
	import type { Snippet } from "svelte";

	interface Props {
		title?: string;
		withReturn?: boolean;
		titleType?: 1 | 2 | 3 | 4 | 5 | 6;
		onTitleClick?: () => void;
		children?: Snippet;
	}
	let { title, withReturn, titleType = 1, onTitleClick, children }: Props = $props();
</script>

<div class="page-title">
	<Title type={titleType} onclick={onTitleClick}>
		{#if title}
			{title}
		{:else}
			{@render children?.()}
		{/if}
	</Title>
	{#if withReturn}
		<div class="button">
			<ButtonAccent
				onclick={() => {
					history.back();
				}}
			>
				<div class="icon">
					<ChevronRightIcon />
				</div>
			</ButtonAccent>
		</div>
	{/if}
</div>

<style lang="scss">
	.page-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 16px 0px;
		.button {
			display: contents;
			.icon {
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>
