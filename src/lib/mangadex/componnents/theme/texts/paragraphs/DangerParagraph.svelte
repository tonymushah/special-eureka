<script lang="ts">
	interface Props {
		variant?: "default" | "l1" | "l2";
		children?: import("svelte").Snippet;
	}

	let { variant = "default", children }: Props = $props();
	let l1 = $derived(variant == "l1");
	let l2 = $derived(variant == "l2");
	let _default = $derived(!l1 && !l2);
</script>

<p class:l1 class:l2 class:default={_default}>
	{@render children?.()}
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
