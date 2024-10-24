<script lang="ts">
	import { UserRole } from "@mangadex/gql/graphql";

	export let roles: UserRole[] = [];
	$: staff =
		roles.includes(UserRole.RoleStaff) ||
		roles.includes(UserRole.RoleDeveloper) ||
		roles.includes(UserRole.RoleDesigner) ||
		roles.includes(UserRole.RolePublicRelations) ||
		roles.includes(UserRole.RoleGlobalModerator) ||
		roles.includes(UserRole.RoleForumModerator) ||
		roles.includes(UserRole.RoleAdmin) ||
		roles.includes(UserRole.RolePublicRelations);
	$: contributor = roles.includes(UserRole.RoleContributor);
	$: powerUploader = roles.includes(UserRole.RolePowerUploader);
	$: groupLeader = roles.includes(UserRole.RoleGroupLeader);
	$: mdHome = roles.includes(UserRole.RoleMdAtHome);
	$: vip = roles.includes(UserRole.RoleVip);
</script>

<span class:groupLeader class:powerUploader class:mdHome class:contributor class:vip class:staff>
	<slot />
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
