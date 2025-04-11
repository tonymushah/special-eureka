<script context="module">
	export interface TableData {
		id: string;
		title: Readable<string | undefined>;
	}
</script>

<script lang="ts">
	import { derived, readable, type Readable } from "svelte/store";
	import { chapterTasks } from "./stores";
	import { ChapterDownload } from "@mangadex/download/chapter";
	import Row from "./chapters/Row.svelte";

	const data = derived(chapterTasks, (tasks) => {
		return tasks.map((task) => {
			return {
				id: task,
				title: readable(undefined)
			};
		}) satisfies TableData[];
	});
</script>

<table>
	<thead>
		<tr>
			<td> <span>ID</span></td>
			<td> <span>State</span></td>
			<td> <span>Title</span> </td>
			<td> <span>Actions</span> </td>
		</tr>
	</thead>
	<tbody>
		{#each $data as props (props.id)}
			<Row {...props} />
		{/each}
	</tbody>
</table>

<style lang="scss">
	table {
		width: 100%;
		border-collapse: collapse;
		thead {
			background-color: var(--accent-l4);
			tr {
				border-radius: 3px;
			}
			td {
				border: 3px solid var(--contrast-l1);
				box-shadow: 0px 3px 0px var(--contrast-l1);
				text-align: center;
				transform: translateY(-3px);
				padding-top: 3px;
			}
		}
	}
</style>
