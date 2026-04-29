<script lang="ts">
	import isFollowingCustomList from "@mangadex/gql-docs/list/id/follow.svelte";
	import { isChangingListFollowing } from "@mangadex/gql-docs/list/id/follow";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import { BookmarkIcon } from "@lucide/svelte";
	import { isLogged } from "@mangadex/utils/auth";
	import { mangadexQueryClient } from "@mangadex/index";
	import layoutButtonCssMod from "./layout-buttons.module.scss";

	interface Props {
		id: string;
	}

	let { id }: Props = $props();
	const isFollowed = isFollowingCustomList(() => id, {
		onSucess() {
			mangadexQueryClient.refetchQueries({
				queryKey: ["custom-list", id, "is-following"]
			});
		}
	});
	let isFollowing = $derived(isFollowed.value);
</script>

<PrimaryButton
	isBase
	disabled={$isChangingListFollowing || !$isLogged}
	onclick={() => {
		isFollowed.value = isFollowed.value;
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
