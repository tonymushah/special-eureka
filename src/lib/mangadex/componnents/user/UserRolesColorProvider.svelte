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

<div class:groupLeader class:powerUploader class:mdHome class:contributor class:vip class:staff>
	<slot />
</div>

<style lang="scss">
	div {
		display: contents;
	}
	.groupLeader {
		--text-color: var(--status-blue);
	}
	.powerUploader {
		--text-color: var(--status-green);
	}
	.mdHome {
		--text-color: var(--status-blue);
	}
	.contributor {
		--text-color: var(--status-green);
	}
	.vip {
		--text-color: var(--status-yellow);
	}
	.staff {
		--text-color: var(--status-purple);
	}
</style>
