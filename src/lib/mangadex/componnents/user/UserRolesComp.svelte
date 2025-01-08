<script lang="ts">
	import { UserRole } from "@mangadex/gql/graphql";

	interface Props {
		roles?: UserRole[];
		children?: import('svelte').Snippet;
	}

	let { roles = [], children }: Props = $props();
	let staff =
		$derived(roles.includes(UserRole.RoleStaff) ||
		roles.includes(UserRole.RoleDeveloper) ||
		roles.includes(UserRole.RoleDesigner) ||
		roles.includes(UserRole.RolePublicRelations) ||
		roles.includes(UserRole.RoleGlobalModerator) ||
		roles.includes(UserRole.RoleForumModerator) ||
		roles.includes(UserRole.RoleAdmin) ||
		roles.includes(UserRole.RolePublicRelations));
	let contributor = $derived(roles.includes(UserRole.RoleContributor));
	let powerUploader = $derived(roles.includes(UserRole.RolePowerUploader));
	let groupLeader = $derived(roles.includes(UserRole.RoleGroupLeader));
	let mdHome = $derived(roles.includes(UserRole.RoleMdAtHome));
	let vip = $derived(roles.includes(UserRole.RoleVip));
</script>

<span class:groupLeader class:powerUploader class:mdHome class:contributor class:vip class:staff>
	{@render children?.()}
</span>

<style lang="scss">
	.groupLeader {
		color: var(--status-blue);
	}
	.powerUploader {
		color: var(--status-green);
	}
	.mdHome {
		color: var(--status-blue);
	}
	.contributor {
		color: var(--indication-blue);
	}
	.vip {
		color: var(--status-yellow);
	}
	.staff {
		color: var(--status-purple);
	}
</style>
