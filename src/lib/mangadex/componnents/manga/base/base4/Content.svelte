<script lang="ts">
	interface Props {
		title: string;
	}

	let { title }: Props = $props();
</script>

<div class="title">
	<p>{title}</p>
</div>

<style lang="scss">
	div.title > p {
		font-weight: 500;
		text-align: center;
		margin: 5px;
		padding: 0px;
		font-size: 16px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		overflow: hidden;
		width: 100%;
	}
</style>
