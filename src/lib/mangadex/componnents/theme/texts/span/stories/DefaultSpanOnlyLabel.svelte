<script lang="ts">
    import DefaultSpan from "../DefaultSpan.svelte";
    interface Props {
        innerText: string;
    }

    let { innerText }: Props = $props();
</script>

<DefaultSpan>
    {innerText}
</DefaultSpan>
