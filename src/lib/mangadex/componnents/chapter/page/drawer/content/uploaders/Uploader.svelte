<script lang="ts">
	import Link from "@mangadex/componnents/theme/links/Link.svelte";
	import UserRolesComp from "@mangadex/componnents/user/UserRolesComp.svelte";
	import { UserIcon } from "svelte-feather-icons";
	import { derived } from "svelte/store";
	import { getCurrentChapterData } from "../../../contexts/currentChapter";
	import { route } from "$lib/ROUTES";
	const uploader = derived(getCurrentChapterData(), ($current) => $current.uploader);
</script>

<div class="uploader">
	<UserIcon />
	<Link
		href={route("/mangadex/user/[id]", {
			id: $uploader.id
		})}
		ext_href={`https://mangadex.org/user/${$uploader.id}`}
	>
		<UserRolesComp roles={$uploader.roles}>
			{$uploader.name}
		</UserRolesComp>
	</Link>
</div>

<style lang="scss">
	.uploader {
		display: flex;
		gap: 10px;
		align-items: center;
	}
</style>
