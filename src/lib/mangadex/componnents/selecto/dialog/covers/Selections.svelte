<script lang="ts">
	interface Props {
		covers?: string[];
	}
	let { covers = $bindable([]) }: Props = $props();
</script>
