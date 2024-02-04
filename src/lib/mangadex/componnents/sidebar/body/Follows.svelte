<script lang="ts">
    import { BookmarkIcon } from "svelte-feather-icons";
    import SubMenu from "../base/SubMenu.svelte";
    import SubMenuItem from "../base/SubMenuItem.svelte";
</script>

<SubMenu label="Follows">
    <BookmarkIcon slot="icon" size="24"/>
    <SubMenuItem label="Updates"/>
    <SubMenuItem label="Online Library"/>
    <SubMenuItem label="MDList"/>
    <SubMenuItem label="Followed Groups"/>
</SubMenu>