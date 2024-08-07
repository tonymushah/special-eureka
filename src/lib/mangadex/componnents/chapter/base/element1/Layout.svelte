<script lang="ts">
	export let haveBeenRead: boolean;
</script>

<div class="layout" class:haveBeenRead>
	<div class="state">
		<slot name="state" />
	</div>
	<div class="flag-reading-state">
		<slot name="flag-reading-state" />
	</div>
	<div class="title-groups">
		<slot name="title-groups" />
	</div>
	<div class="date-uploader">
		<slot name="date-uploader" />
	</div>
	<div class="reading-number-comments">
		<slot name="reading-number-comments" />
	</div>
</div>

<style lang="scss">
	.layout {
		display: grid;
		grid-template-areas: "state flag-reading-state title-groups title-groups title-groups title-groups date-uploader reading-number-comments";
		column-gap: 20px;
		color: var(--text-color);
		padding: 5px;
		transition: background-color 300ms ease-in-out;
		border-radius: 0.5rem;
		width: -webkit-fill-available;
		.state {
			grid-area: state;
		}
		.flag-reading-state {
			grid-area: flag-reading-state;
			width: fit-content;
		}
		.title-groups {
			grid-area: title-groups;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.date-uploader {
			grid-area: date-uploader;
		}
		.reading-number-comments {
			grid-area: reading-number-comments;
			align-items: center;
		}
	}
	.layout:not(.haveBeenRead) {
		border-style: solid;
		border-width: 0px 0px 0px 5px;
		border-color: var(--indication-blue);
	}
	.layout > div {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.state {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
