<script lang="ts">
    import MidToneSpan from "../MidToneSpan.svelte";
    interface Props {
        innerText: string;
    }

    let { innerText }: Props = $props();
</script>

<MidToneSpan>
    {innerText}
</MidToneSpan>
