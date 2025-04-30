<script lang="ts">
	import { createBubbler } from "svelte/legacy";

	const bubble = createBubbler();
	import { emptyMeltElement, melt, type AnyMeltElement } from "@melt-ui/svelte";
	import { camelCase } from "lodash";
	import BeeDexRaw from "@mangadex/assets/Bee Dex Raw.jpg";
	interface Props {
		profilePicture?: string;
		name: string;
		element?: AnyMeltElement;
		_this?: HTMLButtonElement | undefined;
		children?: import("svelte").Snippet;
	}

	let {
		profilePicture = BeeDexRaw,
		name,
		element = emptyMeltElement,
		_this = $bindable(undefined),
		children
	}: Props = $props();
</script>

<button
	bind:this={_this}
	use:melt={$element}
	onabort={bubble("abort")}
	onblur={bubble("blur")}
	oncanplay={bubble("canplay")}
	oncanplaythrough={bubble("canplaythrough")}
	onchange={bubble("change")}
	onclick={bubble("click")}
	oncontextmenu={bubble("contextmenu")}
	ondblclick={bubble("dblclick")}
	ondrag={bubble("drag")}
	ondragend={bubble("dragend")}
	ondragenter={bubble("dragenter")}
	ondragleave={bubble("dragleave")}
	ondragover={bubble("dragover")}
	ondragstart={bubble("dragstart")}
	ondrop={bubble("drop")}
	ondurationchange={bubble("durationchange")}
	onemptied={bubble("emptied")}
	onended={bubble("ended")}
	onerror={bubble("error")}
	onfocus={bubble("focus")}
	oninput={bubble("input")}
	onintroend={bubble("introend")}
	onintrostart={bubble("introstart")}
	oninvalid={bubble("invalid")}
	onkeydown={bubble("keydown")}
	onkeypress={bubble("keypress")}
	onkeyup={bubble("keyup")}
	onload={bubble("load")}
	onloadeddata={bubble("loadeddata")}
	onloadedmetadata={bubble("loadedmetadata")}
	onloadstart={bubble("loadstart")}
	onmousedown={bubble("mousedown")}
	onmouseenter={bubble("mouseenter")}
	onmouseleave={bubble("mouseleave")}
	onmousemove={bubble("mousemove")}
	onmouseout={bubble("mouseout")}
	onmouseover={bubble("mouseover")}
	onmouseup={bubble("mouseup")}
	onoutroend={bubble("outroend")}
	onoutrostart={bubble("outrostart")}
	onpause={bubble("pause")}
	onplay={bubble("play")}
	onplaying={bubble("playing")}
	onpointercancel={bubble("pointercancel")}
	onpointerdown={bubble("pointerdown")}
	onpointerenter={bubble("pointerenter")}
	onpointerleave={bubble("pointerleave")}
	onpointermove={bubble("pointermove")}
	onpointerout={bubble("pointerout")}
	onpointerover={bubble("pointerover")}
	onpointerup={bubble("pointerup")}
	onprogress={bubble("progress")}
	onratechange={bubble("ratechange")}
	onreset={bubble("reset")}
	onresize={bubble("resize")}
	onscroll={bubble("scroll")}
	onseeked={bubble("seeked")}
	onseeking={bubble("seeking")}
	onselect={bubble("select")}
	onstalled={bubble("stalled")}
	onsubmit={bubble("submit")}
	onsuspend={bubble("suspend")}
	ontimeupdate={bubble("timeupdate")}
	onvisibilitychange={bubble("visibilitychange")}
	onvolumechange={bubble("volumechange")}
	onwaiting={bubble("waiting")}
>
	<img alt="{camelCase(name)}-profile-picture" src={profilePicture} />
	<p>{name}</p>
	<div class="right">
		{@render children?.()}
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
		justify-content: end;
	}
</style>
