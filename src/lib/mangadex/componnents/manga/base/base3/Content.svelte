<script lang="ts">
	export let title: string;
</script>

<div class="title">
	<p>{title}</p>
</div>

<style lang="scss">
	div.title {
		width: 10em;
		height: 16em;
		top: -16em;
		position: relative;
		display: flex;
		align-items: end;
		opacity: 1;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, var(--accent-l3) 100%);
		border-radius: 0.25rem;
		transition: opacity 300ms ease-in-out;
	}
	div.title > p {
		font-weight: 700;
		-webkit-box-orient: vertical;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		display: -webkit-box;
		overflow: hidden;
	}
	div.title:hover {
		opacity: 0;
	}
</style>
