<script lang="ts">
	import { slide } from "svelte/transition";
	import { isSidebarRtl } from "../states/isRtl";
	let rtl = $derived($isSidebarRtl);
	interface Props {
		collapsed?: boolean;
		label: string;
	}

	let { collapsed = false, label }: Props = $props();
</script>

{#if !collapsed}
	<div
		class:label={true}
		class:rtl
		transition:slide={{
			axis: "x"
		}}
	>
		<h4>{label}</h4>
	</div>
{/if}

<style lang="scss">
	h4 {
		color: currentColor;
		font-family: var(--fonts);
		margin: 0px;
		margin-left: 10px;
	}
	div {
		display: -webkit-box;
		overflow: hidden;
		text-wrap: nowrap;
		text-overflow: ellipsis;
		animation-duration: 300ms;
		animation-timing-function: ease-in-out;
		animation-fill-mode: forwards;
	}
	.label.rtl {
		text-align: end;
	}
	.label {
		width: 100%;
		transition: text-align 300ms ease-in-out;
	}
</style>
