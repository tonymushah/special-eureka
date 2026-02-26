<script lang="ts">
	import isFollowingCustomList, {
		isChangingListFollowing
	} from "@mangadex/gql-docs/list/id/follow";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import { BookmarkIcon } from "@lucide/svelte";
	import { isLogged } from "@mangadex/utils/auth";
	import { mangadexQueryClient } from "@mangadex/index";
	import layoutButtonCssMod from "./layout-buttons.module.scss";

	interface Props {
		id: string;
	}

	let { id }: Props = $props();
	// svelte-ignore state_referenced_locally
	const isFollowed = isFollowingCustomList(id, {
		onSucess() {
			mangadexQueryClient.refetchQueries({
				queryKey: ["custom-list", id, "is-following"]
			});
		}
	});
	let isFollowing = $derived($isFollowed);
</script>

<PrimaryButton
	isBase
	disabled={$isChangingListFollowing || !$isLogged}
	onclick={() => {
		$isFollowed = !$isFollowed;
	}}
>
	<p class={layoutButtonCssMod.innerButton}>
		{#if isFollowing}
			<BookmarkIcon /> Unfollow
		{:else}
			Follow
		{/if}
	</p>
</PrimaryButton>
