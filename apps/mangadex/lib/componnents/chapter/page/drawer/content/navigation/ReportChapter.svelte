<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import Icon from "./report/Icon.svelte";
	import { fireReportChapterEvent } from "../../../contexts/previousNextEventTarget";
</script>

<ButtonAccentOnlyLabel on:click={fireReportChapterEvent} icon={Icon} label="Report Chapter" />
