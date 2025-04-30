<script lang="ts">
	import { UserRole } from "@mangadex/gql/graphql";

	interface Props {
		roles?: UserRole[];
		children?: import("svelte").Snippet;
	}

	let { roles = [], children }: Props = $props();
	let staff = $derived(
		roles.includes(UserRole.RoleStaff) ||
			roles.includes(UserRole.RoleDeveloper) ||
			roles.includes(UserRole.RoleDesigner) ||
			roles.includes(UserRole.RolePublicRelations) ||
			roles.includes(UserRole.RoleGlobalModerator) ||
			roles.includes(UserRole.RoleForumModerator) ||
			roles.includes(UserRole.RoleAdmin) ||
			roles.includes(UserRole.RolePublicRelations)
	);
	let contributor = $derived(roles.includes(UserRole.RoleContributor));
	let powerUploader = $derived(roles.includes(UserRole.RolePowerUploader));
	let groupLeader = $derived(roles.includes(UserRole.RoleGroupLeader));
	let mdHome = $derived(roles.includes(UserRole.RoleMdAtHome));
	let vip = $derived(roles.includes(UserRole.RoleVip));
</script>

<div class:groupLeader class:powerUploader class:mdHome class:contributor class:vip class:staff>
	{@render children?.()}
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
