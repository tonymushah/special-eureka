<script lang="ts">
    import DangerParagraph from "../DangerParagraph.svelte";
    export let variant: "default" | "l1" | "l2" = "default";
    export let innerText: string;
</script>

<DangerParagraph {variant}>
    {innerText}
</DangerParagraph>