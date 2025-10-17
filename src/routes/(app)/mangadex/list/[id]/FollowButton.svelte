<script lang="ts">
	import isFollowingCustomList, {
		isChangingListFollowing
	} from "@mangadex/gql-docs/list/id/follow";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import { BookmarkIcon } from "svelte-feather-icons";
	import { isLogged } from "@mangadex/utils/auth";

	interface Props {
		id: string;
	}

	let { id }: Props = $props();
	const isFollowed = isFollowingCustomList(id);
</script>

<PrimaryButton
	isBase
	disabled={$isChangingListFollowing || !$isLogged}
	onclick={() => {
		$isFollowed = !$isFollowed;
	}}
>
	<p>
		{#if $isFollowed}
			<BookmarkIcon /> Unfollow
		{:else}
			Follow
		{/if}
	</p>
</PrimaryButton>
