<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import Icon from "./report/Icon.svelte";
	import { fireReportChapterEvent } from "../../../contexts/previousNextEventTarget";
	import { isLogged } from "@mangadex/utils/auth";
	import { dev } from "$app/environment";
</script>

<ButtonAccentOnlyLabel
	disabled={!$isLogged || dev}
	onclick={fireReportChapterEvent}
	icon={Icon}
	label="Report Chapter"
/>
