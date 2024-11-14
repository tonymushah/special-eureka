<script lang="ts">
	import { UserRole } from "@mangadex/gql/graphql";
	import StatusBadgeOnlyLabel from "../theme/tag/StatusBadgeOnlyLabel.svelte";
	import IndicationBadge from "../theme/tag/IndicationBadge.svelte";
	import IndicationOnlyLabel from "../theme/tag/IndicationOnlyLabel.svelte";
	import { camelCase, startCase, upperCase } from "lodash";
	import StatusButtonOnlyLabel from "../theme/buttons/StatusButtonOnlyLabel.svelte";
	import StatusBadge from "../theme/tag/StatusBadge.svelte";

	export let role: UserRole;
	$: staff =
		role == UserRole.RoleStaff ||
		role == UserRole.RoleDeveloper ||
		role == UserRole.RoleDesigner ||
		role == UserRole.RolePublicRelations ||
		role == UserRole.RoleGlobalModerator ||
		role == UserRole.RoleForumModerator ||
		role == UserRole.RoleAdmin;
	$: contributor = role == UserRole.RoleContributor;
	$: powerUploader = role == UserRole.RolePowerUploader;
	$: groupLeader = role == UserRole.RoleGroupLeader;
	$: mdHome = role == UserRole.RoleMdAtHome;
	$: vip = role == UserRole.RoleVip;
	$: label = startCase(camelCase(role.replace("ROLE_", "")));
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
