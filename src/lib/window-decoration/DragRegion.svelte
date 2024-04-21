<div data-tauri-drag-region>
	<slot />
</div>

<style lang="scss">
	div {
		transition: background-color 300ms ease-in-out;
		color: var(--textColor);
		background-color: var(--background);
	}
	div:hover {
		background-color: var(--backgroundOnHover);
	}
</style>
