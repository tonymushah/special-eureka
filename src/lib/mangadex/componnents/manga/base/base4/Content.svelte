<script lang="ts">
	interface Props {
		title: string;
	}

	let { title }: Props = $props();
</script>

<div class="title">
	<span>{title}</span>
</div>

<style lang="scss">
	div.title > span {
		font-weight: 500;
		-webkit-box-orient: vertical;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		display: -webkit-box;
		overflow: hidden;
		text-align: start;
		margin: 0px;
		padding: 5px;
		font-size: 16px;
	}
</style>
