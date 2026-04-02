<script lang="ts">
	import { Progress } from "@ark-ui/svelte";
	import styles from "./update-progress.module.scss";
	import { updateState as updateStateRaw } from "@special-eureka/core/commands/updater";
	let updateValue = $derived.by<{
		current: number;
		max: number;
	} | null>(() => {
		const state = $updateStateRaw;
		if (state == "Finished") {
			return {
				current: 100,
				max: 100
			};
		} else if (state == "Starting") {
			return {
				current: 0,
				max: 100
			};
		} else if (typeof state == "object" && state?.Downloading) {
			const downloading = state.Downloading;
			if (downloading.content_lenght != undefined) {
				return {
					current: downloading.downloaded,
					max: downloading.content_lenght
				};
			} else {
				return null;
			}
		} else {
			return null;
		}
	});
</script>

<div class="update-layout">
	<Progress.Root class={styles.root} value={updateValue?.current ?? null} max={updateValue?.max}>
		<Progress.Label class={styles.label}>Progress</Progress.Label>
		<Progress.ValueText class={styles.valueText} />
		<Progress.Track class={styles.track}>
			<Progress.Range class={styles.range} />
		</Progress.Track>
	</Progress.Root>
</div>

<style lang="scss">
	.update-layout {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1em;
	}
</style>
