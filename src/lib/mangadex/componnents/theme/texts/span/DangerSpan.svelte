<script lang="ts">
	export let variant: "default" | "l1" | "l2" = "default";
	$: l1 = variant == "l1";
	$: l2 = variant == "l2";
	$: _default = !l1 && !l2;
</script>

<span class:l1 class:l2 class:default={_default}>
	<slot />
</span>

<style lang="scss">
	span {
		font-size: var(--font-size);
		font-family: var(--fonts);
	}
	span.default {
		color: var(--danger);
	}
	span.l1 {
		color: var(--danger-l1);
	}
	span.l2 {
		color: var(--danger-l2);
	}
</style>
