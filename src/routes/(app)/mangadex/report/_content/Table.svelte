<script lang="ts">
	import { ReportStatus } from "@mangadex/gql/graphql";

	import TimeAgo from "@mangadex/componnents/TimeAgo.svelte";
	import {
		createColumnHelper,
		createTable,
		getCoreRowModel,
		type TableState,
		type Updater
	} from "@tanstack/table-core";
	import type { ReportData } from "../types";
	import { flexRender } from "$lib/utils";
	interface Props {
		data: ReportData[];
	}

	let { data }: Props = $props();
	const columnHelper = createColumnHelper<ReportData>();
	const columns = [
		columnHelper.accessor("objectId", {
			cell(props) {
				return props.getValue();
			},
			header: "Object ID"
		}),
		columnHelper.accessor("details", {
			cell(props) {
				return props.getValue();
			},
			header: "Details"
		}),
		columnHelper.accessor("status", {
			cell(props) {
				switch (props.getValue()) {
					case ReportStatus.Accepted:
						return "Accepted";
					case ReportStatus.Autoresolved:
						return "Autoresolved";
					case ReportStatus.Refused:
						return "Refused";
					case ReportStatus.Waiting:
						return "Waiting";
					default:
						return "...";
				}
			},
			header: "Status"
		}),
		columnHelper.accessor("createdAt", {
			cell(props) {
				return new Date(props.getValue());
			},
			header: "Created"
		})
	];
	let table = $derived(
		createTable<ReportData>({
			data,
			columns,
			getCoreRowModel: getCoreRowModel(),
			onStateChange: function (updater: Updater<TableState>): void {},
			renderFallbackValue: null,
			state: {
				columnPinning: {
					left: [],
					right: []
				}
			}
		})
	);
</script>

{#snippet createdAtRender(toUse: Date)}
	<TimeAgo date={toUse} />
{/snippet}
<section>
	<table>
		<thead>
			{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
				<tr>
					{#each headerGroup.headers as header (header.id)}
						<th colspan={header.colSpan}>
							{header.column.columnDef.header}
						</th>
					{/each}
				</tr>
			{/each}
		</thead>
		<tbody>
			{#each table.getRowModel().rows as row (row.id)}
				<tr>
					{#each row.getVisibleCells() as cell (cell.id)}
						{@const renderValue = flexRender(
							cell.column.columnDef.cell,
							cell.getContext()
						)}
						<td>
							{#if renderValue instanceof Date}
								{@render createdAtRender(renderValue)}
							{:else}
								{renderValue}
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</section>

<style lang="scss">
	table {
		border-collapse: collapse;
	}
	td {
		border: 3px dashed var(--mid-tone);
		padding: 0px 12px;
	}
	tbody {
		td:hover {
			border: 3px solid var(--mid-tone);
			background-color: var(--accent-l1-hover);
		}
	}
	thead {
		background-color: var(--primary-l2);
	}
	tbody {
		tr {
			background-color: var(--accent);
		}
		tr:hover {
			background-color: var(--accent-hover);
		}
	}
	th {
		border: 3px solid var(--mid-tone);
	}
	section {
		overflow: hidden;
		border-radius: 0.25em;
	}
</style>
