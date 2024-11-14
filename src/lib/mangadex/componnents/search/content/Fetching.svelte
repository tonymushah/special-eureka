<script lang="ts">
	import { range } from "lodash";
	import { onMount } from "svelte";
	const DOT_LIMIT = 6;
	let dots = "";
	onMount(() => {
		let current_number = 0;
		const interval = setInterval(() => {
			if (current_number > DOT_LIMIT) {
				current_number = 0;
			}
			dots = range(current_number)
				.map(() => ".")
				.join("");
			current_number += 1;
		}, 500);
		return () => clearInterval(interval);
	});
</script>

<p>
	Fetching{dots}
</p>
