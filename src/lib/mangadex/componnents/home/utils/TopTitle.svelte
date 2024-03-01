<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import { createEventDispatcher } from "svelte";
	import { RefreshCwIcon } from "svelte-feather-icons";

	export let label: string;
	export let fetching: boolean;
	const dispacther = createEventDispatcher<{
		refresh: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	$: console.log(`fetching ${fetching}`);
</script>

<div class="title with-margin">
	<Title>{label}</Title>
	<span class="button" class:fetching>
		<ButtonAccent
			on:click={(e) => {
				dispacther("refresh", e);
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
