<script lang="ts">
	export let icon: string | undefined = undefined;
	export let alt: string;
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
