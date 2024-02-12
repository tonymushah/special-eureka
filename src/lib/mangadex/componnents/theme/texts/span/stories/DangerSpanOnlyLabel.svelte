<script lang="ts">
    import DangerSpan from "../DangerSpan.svelte";
    export let variant: "default" | "l1" | "l2" = "default";
    export let innerText: string;
</script>

<DangerSpan {variant}>
    {innerText}
</DangerSpan>