<script lang="ts">
    import DangerSpan from "../DangerSpan.svelte";
    interface Props {
        variant?: "default" | "l1" | "l2";
        innerText: string;
    }

    let { variant = "default", innerText }: Props = $props();
</script>

<DangerSpan {variant}>
    {innerText}
</DangerSpan>