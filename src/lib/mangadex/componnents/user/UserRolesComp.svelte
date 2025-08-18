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

<span class:groupLeader class:powerUploader class:mdHome class:contributor class:vip class:staff>
	{@render children?.()}
</span>

<style lang="scss">
	:root {
		--status-percent: 50%;
		--text-color-percent: 50%;
	}
	.groupLeader {
		color: color-mix(
			in srgb,
			var(--status-blue) var(--status-percent),
			var(--text-color) var(--text-color-percent)
		);
	}
	.powerUploader {
		color: color-mix(
			in srgb,
			var(--status-green) var(--status-percent),
			var(--text-color) var(--text-color-percent)
		);
	}
	.mdHome {
		color: color-mix(
			in srgb,
			var(--status-blue) var(--status-percent),
			var(--text-color) var(--text-color-percent)
		);
	}
	.contributor {
		color: color-mix(
			in srgb,
			var(--indication-blue) var(--status-percent),
			var(--text-color) var(--text-color-percent)
		);
	}
	.vip {
		color: color-mix(
			in srgb,
			var(--status-yellow) var(--status-percent),
			var(--text-color) var(--text-color-percent)
		);
	}
	.staff {
		color: color-mix(
			in srgb,
			var(--status-purple) var(--status-percent),
			var(--text-color) var(--text-color-percent)
		);
	}
</style>
