<script lang="ts">
    import DefaultParagraph from "../DefaultParagraph.svelte";
    export let innerText: string;
</script>

<DefaultParagraph>
    {innerText}
</DefaultParagraph>
