<script lang="ts">
    import PrimarySpan from "../PrimarySpan.svelte";
    export let variant: "default" | "l1" | "l2" = "default";
    export let innerText: string;
</script>

<PrimarySpan {variant}>
    {innerText}
</PrimarySpan>