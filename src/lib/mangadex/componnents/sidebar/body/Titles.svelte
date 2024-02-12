<script lang="ts">
    import { BookIcon } from "svelte-feather-icons";
    import SubMenu from "../base/SubMenu.svelte";
    import SubMenuItem from "../base/SubMenuItem.svelte";
</script>

<SubMenu label="Titles">
    <BookIcon slot="icon" size="24"/>
    <SubMenuItem label="Offline Library"/>
    <SubMenuItem label="Latest Updates"/>
    <SubMenuItem label="Random"/>
    <SubMenuItem label="Recently Popular"/>
</SubMenu>