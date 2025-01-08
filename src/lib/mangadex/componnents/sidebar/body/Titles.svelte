<script lang="ts">
    import { BookIcon } from "svelte-feather-icons";
    import SubMenu from "../base/SubMenu.svelte";
    import SubMenuItem from "../base/SubMenuItem.svelte";
</script>

<SubMenu label="Titles">
    {#snippet icon()}
        <BookIcon  size="24"/>
    {/snippet}
    <SubMenuItem label="Offline Library"/>
    <SubMenuItem label="Latest Updates"/>
    <SubMenuItem label="Random"/>
    <SubMenuItem label="Recently Popular"/>
</SubMenu>