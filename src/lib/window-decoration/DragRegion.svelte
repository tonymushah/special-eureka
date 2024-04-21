<div data-tauri-drag-region>
	<slot />
</div>

<style lang="scss">
	div {
		transition: background 300ms ease-in-out;
		-webkit-transition: -webkit-background 300ms ease-in-out;
		color: var(--textColor);
		-webkit-background: var(--background);
		background: var(--background);
	}
	div:hover {
		-webkit-background: var(--backgroundOnHover);
		background: var(--backgroundOnHover);
	}
</style>
