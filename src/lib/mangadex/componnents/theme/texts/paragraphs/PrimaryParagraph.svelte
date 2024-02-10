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
		color: var(--primary);
	}
	p.l1 {
		color: var(--primary-l1);
	}
	p.l2 {
		color: var(--primary-l2);
	}
</style>
