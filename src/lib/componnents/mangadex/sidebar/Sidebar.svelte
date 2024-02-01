<script>

	import { Box, Button } from "@svelteuidev/core";

    let isOpen = true;
    $: width = isOpen ? "200px" : "80px";
</script>
<div>
    <Box on:click={() => {
        isOpen != isOpen
    }}>
        My Sidebar
    </Box>
</div>

<style>
    div {
        transition: width ease-in-out 300ms;
        background-color: #2e2e2e;
        height: 100vh;
    }
</style>