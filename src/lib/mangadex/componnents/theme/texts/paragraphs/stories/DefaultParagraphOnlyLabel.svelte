<script lang="ts">
    import DefaultParagraph from "../DefaultParagraph.svelte";
    interface Props {
        innerText: string;
    }

    let { innerText }: Props = $props();
</script>

<DefaultParagraph>
    {innerText}
</DefaultParagraph>
