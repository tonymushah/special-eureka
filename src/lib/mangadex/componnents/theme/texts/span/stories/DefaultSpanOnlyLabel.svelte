<script lang="ts">
    import DefaultSpan from "../DefaultSpan.svelte";
    export let innerText: string;
</script>

<DefaultSpan>
    {innerText}
</DefaultSpan>
