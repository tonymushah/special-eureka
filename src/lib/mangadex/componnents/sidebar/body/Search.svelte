<script lang="ts">
    import { SearchIcon } from "svelte-feather-icons";
    import SubMenu from "../base/SubMenu.svelte";
    import SubMenuItem from "../base/SubMenuItem.svelte";
</script>

<SubMenu label="Search">
    <SearchIcon slot="icon" size="24"/>
    <SubMenuItem label="Manga"/>
    <SubMenuItem label="Author"/>
    <SubMenuItem label="Groups"/>
</SubMenu>