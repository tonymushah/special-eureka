<script lang="ts">
	export let variant: "default" | "l1" | "l2" = "default";
	$: l1 = variant == "l1";
	$: l2 = variant == "l2";
	$: _default = !l1 && !l2;
</script>

<p class:l1 class:l2 class:default={_default}>
	<slot />
</p>

<style lang="scss">
	p {
		font-size: var(--font-size);
		font-family: var(--fonts);
	}
	p.default {
		color: var(--danger);
	}
	p.l1 {
		color: var(--danger-l1);
	}
	p.l2 {
		color: var(--danger-l2);
	}
</style>
