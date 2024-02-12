<script lang="ts">
    import { sidebarState as isOpen } from "@mangadex/stores";
    import HeaderChevronBase from "./HeaderChevronBase.svelte";
    $: size = !$isOpen ? "24": "12";
</script>

<HeaderChevronBase isRight={!$isOpen} {size} on:click={() => {
    $isOpen = !$isOpen
}}/>
