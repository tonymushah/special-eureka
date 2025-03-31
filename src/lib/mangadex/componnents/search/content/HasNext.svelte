<script lang="ts">
	import { range } from "lodash";
	import { onMount } from "svelte";
	const OO_LIMIT = 6;
	let oo = $state("");
	onMount(() => {
		let current_number = 1;
		const interval = setInterval(() => {
			if (current_number > OO_LIMIT) {
				current_number = 1;
			}
			oo = range(current_number)
				.map(() => (current_number % 2 == 0 ? "o" : "O"))
				.join("");
			current_number += 1;
		}, 1000);
		return () => clearInterval(interval);
	});
</script>

<p>
	There is s{oo}mething t{oo} sh{oo}w
</p>
