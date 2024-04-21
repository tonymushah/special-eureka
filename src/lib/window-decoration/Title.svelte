<script>
	import { logo, title } from "./WindowDecoration.svelte";
</script>

<div class="title" data-tauri-drag-region>
	<img data-tauri-drag-region src={$logo} alt="icon" />
	<h4 data-tauri-drag-region>{$title}</h4>
</div>

<style lang="scss">
	.title {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 12px;
		h4 {
			margin: 0px;
			font-weight: 900;
			font-size: larger;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		img {
			width: 25px;
			padding-left: 5px;
		}
	}
</style>
