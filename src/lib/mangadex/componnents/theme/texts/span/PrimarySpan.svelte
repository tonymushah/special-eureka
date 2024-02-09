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
	span.default {
		color: var(--primary);
	}
	span.l1 {
		color: var(--primary-l1);
	}
	span.l2 {
		color: var(--primary-l2);
	}
</style>
