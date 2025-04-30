<script lang="ts">
	// import { isSidebarRtl } from "@mangadex/componnents/sidebar/states/isRtl";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import { RefreshCwIcon } from "svelte-feather-icons";

	interface Events {
		onrefresh?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement;
			}
		) => any;
	}

	interface Props extends Events {
		label: string;
		fetching: boolean;
	}

	let { label, fetching = $bindable(), onrefresh }: Props = $props();

	// $: console.log(`fetching ${fetching}`);
</script>

<div class="title with-margin">
	<Title>{label}</Title>
	<span class="button" class:fetching>
		<ButtonAccent
			onclick={(e) => {
				onrefresh?.(e);
			}}
		>
			<div class="icon" class:fetching>
				<RefreshCwIcon size={"24px"} />
			</div>
		</ButtonAccent>
	</span>
</div>

<style lang="scss">
	.with-margin {
		margin-left: 1em;
		margin-right: 1em;
		margin-bottom: 0.5em;
	}
	div.title {
		display: flex;
		align-items: center;
		justify-content: start;
		flex-direction: row;
		gap: 10px;
		z-index: 3;
		position: relative;
	}
	/*
	div.title.rtl {
		flex-direction: row-reverse;
		justify-content: end;
	}
    */
	.fetching {
		cursor: not-allowed;
	}
	span.button {
		div.icon {
			width: 24px;
			height: 24px;
		}
		div.icon.fetching {
			animation: icon-rotate 1s ease-in-out 0s infinite;
		}
	}
	@keyframes icon-rotate {
		0% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(180deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
