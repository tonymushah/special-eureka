<script lang="ts">
	import wordMark from "@mangadex/assets/mangadex-wordmark.svg";
	import { sidebarState as isOpen } from "@mangadex/stores";
	import Logo from "../Logo.svelte";
	import { Box } from "@svelteuidev/core";
	import WordMark from "../WordMark.svelte";
</script>

<Box on:click={() => {
    $isOpen = !$isOpen;
}}>
	<div class="base">
		<div>
			<Logo />
		</div>

		<div class="img" class:collapsed={$isOpen} >
            <WordMark/>
        </div>
	</div>
</Box>

<style>
	.img {
		margin-left: 0.5em;
		animation: img-fade-in 300ms ease-in-out;
		animation-fill-mode: forwards;
	}
	.img.collapsed {
		animation: img-fade-out 300ms ease-in-out;
		animation-fill-mode: forwards;
        display: none;
	}
	@keyframes img-fade-out {
		from {
			width: initial;
			display: initial;
			opacity: 1;
		}
		to {
			display: none;
			opacity: 0;
			width: 0px;
		}
	}
	@keyframes img-fade-in {
		from {
			width: 0;
			opacity: 0;
			display: initial;
		}
		to {
			width: initial;
			opacity: 1;
		}
	}
	.base {
		display: flex;
		flex-direction: row;
		flex-flow: row;
		align-items: center;
		justify-content: center;
	}
</style>
