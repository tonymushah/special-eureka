<script>
	import { RefreshCwIcon } from "svelte-feather-icons";
</script>

<div class="loading-icon">
	<RefreshCwIcon size="24px" />
</div>

<style lang="scss">
	@keyframes icon-rotate {
		0% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(180deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	.loading-icon {
		animation: icon-rotate 1s ease-in-out 0s infinite;
		width: 24px;
		height: 24px;
	}
</style>
