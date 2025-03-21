<script lang="ts">
	interface Props {
		icon?: string | undefined;
		alt: string;
	}

	let { icon = undefined, alt }: Props = $props();
</script>

{#if icon != undefined}
	<img class="ico" src={icon} {alt} />
{/if}

<style lang="scss">
	.ico {
		width: 20px;
		border-radius: 0.25em;
	}
</style>
