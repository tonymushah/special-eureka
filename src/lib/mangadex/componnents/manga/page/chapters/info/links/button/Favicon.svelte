<script lang="ts">
	import { XMLParser } from "fast-xml-parser";
	export let icon: string | undefined = undefined;
	export let alt: string;
	function isSvg(icon: string): boolean {
		const xmlp = new XMLParser();
		try {
			const jObj = xmlp.parse(icon);
			return jObj.svg != undefined;
		} catch (error) {
			return false;
		}
	}
	$: isSvg_ = isSvg(icon ?? "");
</script>

{#if icon != undefined}
	{#if isSvg_}
		<div class="ico">
			{@html icon}
		</div>
	{:else}
		<img class="ico" src={icon} {alt} />
	{/if}
{/if}

<style lang="scss">
	.ico {
		width: 20px;
		border-radius: 0.25em;
	}
	div.ico {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
