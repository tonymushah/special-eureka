<script lang="ts">
    import PrimaryParagraph from "../PrimaryParagraph.svelte";
    export let variant: "default" | "l1" | "l2" = "default";
    export let innerText: string;
</script>

<PrimaryParagraph {variant}>
    {innerText}
</PrimaryParagraph>