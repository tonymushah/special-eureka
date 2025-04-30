<script lang="ts">
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import type { Writable } from "svelte/store";
	import IsFollowingIcon from "../IsFollowingIcon.svelte";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import IsFollowingIconOff from "./isFollowing/IsFollowingIconOff.svelte";

	interface Props {
		isFollowing: Writable<boolean>;
	}

	let { isFollowing }: Props = $props();
	function toggle() {
		isFollowing.set(!$isFollowing);
	}
</script>

{#if $isFollowing}
	<PrimaryButton onclick={toggle} isBase>
		<IsFollowingIcon />
	</PrimaryButton>
{:else}
	<ButtonAccent isBase onclick={toggle}>
		<IsFollowingIconOff />
	</ButtonAccent>
{/if}
