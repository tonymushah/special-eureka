<script lang="ts">
	import { emptyMeltElement, melt, type AnyMeltElement } from "@melt-ui/svelte";
	import { camelCase } from "lodash";
	import BeeDexRaw from "@mangadex/assets/Bee Dex Raw.jpg";
	export let profilePicture: string = BeeDexRaw;
	export let name: string;
	export let element: AnyMeltElement = emptyMeltElement;
	export let _this: HTMLButtonElement | undefined = undefined;
</script>

<button
	bind:this={_this}
	use:melt={$element}
	on:abort
	on:blur
	on:canplay
	on:canplaythrough
	on:change
	on:click
	on:contextmenu
	on:dblclick
	on:drag
	on:dragend
	on:dragenter
	on:dragleave
	on:dragover
	on:dragstart
	on:drop
	on:durationchange
	on:emptied
	on:ended
	on:error
	on:focus
	on:input
	on:introend
	on:introstart
	on:invalid
	on:keydown
	on:keypress
	on:keyup
	on:load
	on:loadeddata
	on:loadedmetadata
	on:loadstart
	on:mousedown
	on:mouseenter
	on:mouseleave
	on:mousemove
	on:mouseout
	on:mouseover
	on:mouseup
	on:outroend
	on:outrostart
	on:pause
	on:play
	on:playing
	on:pointercancel
	on:pointerdown
	on:pointerenter
	on:pointerleave
	on:pointermove
	on:pointerout
	on:pointerover
	on:pointerup
	on:progress
	on:ratechange
	on:reset
	on:resize
	on:scroll
	on:seeked
	on:seeking
	on:select
	on:stalled
	on:submit
	on:suspend
	on:timeupdate
	on:visibilitychange
	on:volumechange
	on:waiting
>
	<img alt="{camelCase(name)}-profile-picture" src={profilePicture} />
	<p>{name}</p>
	<div class="right">
		<slot />
	</div>
</button>

<style lang="scss">
	:root {
		--outer-border: 3px;
	}
	img {
		border-radius: 100vh;
		aspect-ratio: 1/1;
		width: 3.5em;
	}
	p {
		font-size: 1.25em;
		margin: 0px;
	}
	button {
		padding: 0.5em 0.25em;
		padding-right: 1em;
		display: flex;
		gap: 0.5em;
		align-items: center;
		background-color: var(--accent);
		transition:
			(box-shadow, transform) 100ms ease-in-out,
			background-color 200ms ease-in-out;
		color: var(--text-color);
		font-family: var(--fonts);
		border-radius: 8px;
		border-color: var(--mid-tone);
		border-style: solid;
		border-width: var(--outer-border);
		box-shadow: 0px var(--outer-border) 0px var(--mid-tone);
	}
	button:hover {
		background-color: var(--accent-hover);
	}
	button:active {
		background-color: var(--accent-active);
		box-shadow: none;
		transform: translateY(var(--outer-border));
	}
	.right {
		align-self: flex-end;
	}
</style>
