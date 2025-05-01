<script lang="ts">
	import { UsersIcon } from "svelte-feather-icons";
	import { getCurrentChapterData } from "../../../contexts/currentChapter";
	import { derived } from "svelte/store";
	import Link from "@mangadex/componnents/theme/links/Link.svelte";
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";
	const current = getCurrentChapterData();
	const groups = derived(current, ($current) => $current.groups);
</script>

<div class="groups">
	<UsersIcon />
	<ul>
		{#each $groups as group}
			<li>
				<Link
					variant="base"
					href={route("/mangadex/group/[id]", {
						id: group.id
					})}
					>{group.name}
				</Link>
			</li>
		{:else}
			<span class="no-group">No groups</span>
		{/each}
	</ul>
</div>

<style lang="scss">
	.groups {
		display: flex;
		gap: 10px;
		align-items: center;
		ul {
			list-style: none;
			padding: 0;
			margin: 0;
			display: grid;
			span.no-group {
				font-style: italic;
			}
		}
	}
</style>
