<script lang="ts">
	import { route } from "$lib/ROUTES";
	import { HomeIcon } from "svelte-feather-icons";
	import Menu from "../base/Menu.svelte";
</script>

<Menu label="Home" href={route("/mangadex")}>
	<HomeIcon slot="icon" size="24" />
</Menu>
