<script lang="ts">
	import { UserRole } from "@mangadex/gql/graphql";
	import StatusBadgeOnlyLabel from "../theme/tag/StatusBadgeOnlyLabel.svelte";
	import IndicationBadge from "../theme/tag/IndicationBadge.svelte";
	import IndicationOnlyLabel from "../theme/tag/IndicationOnlyLabel.svelte";
	import { camelCase, startCase, upperCase } from "lodash";
	import StatusButtonOnlyLabel from "../theme/buttons/StatusButtonOnlyLabel.svelte";
	import StatusBadge from "../theme/tag/StatusBadge.svelte";

	interface Props {
		role: UserRole;
	}

	let { role }: Props = $props();
	let staff = $derived(
		role == UserRole.RoleStaff ||
			role == UserRole.RoleDeveloper ||
			role == UserRole.RoleDesigner ||
			role == UserRole.RolePublicRelations ||
			role == UserRole.RoleGlobalModerator ||
			role == UserRole.RoleForumModerator ||
			role == UserRole.RoleAdmin
	);
	let contributor = $derived(role == UserRole.RoleContributor);
	let powerUploader = $derived(role == UserRole.RolePowerUploader);
	let groupLeader = $derived(role == UserRole.RoleGroupLeader);
	let mdHome = $derived(role == UserRole.RoleMdAtHome);
	let vip = $derived(role == UserRole.RoleVip);
	let label = $derived(startCase(camelCase(role.replace("ROLE_", ""))));
</script>

{#if staff}
	<StatusBadge color="purple">
		<p>{label}</p>
	</StatusBadge>
{:else if contributor}
	<IndicationBadge>
		<p>{upperCase(label)}</p>
	</IndicationBadge>
{:else if vip}
	<StatusBadge color="yellow">
		<p>{label}</p>
	</StatusBadge>
{:else if mdHome}
	<StatusBadge color="blue">
		<p>{label}</p>
	</StatusBadge>
{:else if powerUploader}
	<StatusBadge color="green">
		<p>{label}</p>
	</StatusBadge>
{:else if groupLeader}
	<StatusBadge color="blue">
		<p>{label}</p>
	</StatusBadge>
{:else}
	<StatusBadge color="gray">
		<p>{label}</p>
	</StatusBadge>
{/if}

<style lang="scss">
	p {
		margin: 0px;
		font-size: 1.125em;
	}
</style>
