<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { GridIcon, TableIcon } from "svelte-feather-icons";
	import { ReportStatusMode, type ReportData } from "../types";
	import Table from "./Table.svelte";
	import MidToneLine from "@mangadex/componnents/theme/lines/MidToneLine.svelte";
	import Cards from "./Cards.svelte";

	let style: ReportStatusMode = $state(ReportStatusMode.Card);
	const size = "20";
	interface Props {
		data: ReportData[];
	}
	let { data }: Props = $props();
</script>

<div class="tab-title">
	<div class="tab-additional-content">
		<span>:3</span>
	</div>
	<div class="tab-select">
		<ButtonAccent
			onclick={() => {
				style = ReportStatusMode.Table;
			}}
			variant={style == ReportStatusMode.Table ? "4" : "1"}
		>
			<div class="icon">
				<TableIcon {size} />
			</div>
		</ButtonAccent>
		<ButtonAccent
			onclick={() => {
				style = ReportStatusMode.Card;
			}}
			variant={style == ReportStatusMode.Card ? "5" : "1"}
		>
			<div class="icon">
				<GridIcon {size} />
			</div>
		</ButtonAccent>
	</div>
</div>

<MidToneLine />

<div class="content">
	{#if style == ReportStatusMode.Table}
		<Table {data} />
	{:else if style}
		<Cards {data} />
	{/if}
</div>

<style lang="scss">
	.tab-select {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
	}
	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 6px;
	}
	div.tab-title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
</style>
