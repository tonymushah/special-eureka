<script lang="ts">
	import { ContentProfileWarningMode } from "@mangadex/gql/graphql";
	import contentProfileWarningMode, {
		contentProfileWarningModeMutation as contentProfileWarningModeMutationLoader
	} from "@mangadex/stores/contentProfileWarningMode";
	let contentProfileWarningModeMutation = contentProfileWarningModeMutationLoader();
</script>

<div>
	<h3>Content warning preference in titles:</h3>
	<select
		bind:value={$contentProfileWarningMode}
		disabled={contentProfileWarningModeMutation.isPending}
	>
		<option value={ContentProfileWarningMode.Always}>Always</option>
		<option value={ContentProfileWarningMode.Never}>Never</option>
		<option value={ContentProfileWarningMode.Autl}
			>Always unless the title is in the library</option
		>
		<option value={ContentProfileWarningMode.AutlNd}
			>Always unless the title is in the library and not dropped</option
		>
	</select>
</div>

<section>
	<p>
		Control when warnings for titles are shown for titles matching your global filters. Options:
	</p>
	<ul class="modes">
		<li>
			<strong>Always</strong> - Always show a warning when a title matches your global filters.
		</li>
		<li>
			<strong>Never</strong> - Never show a warning when a title matches your global filters.
		</li>
		<li>
			<strong>Always unless the title is in the library</strong> - Show a warning when a title
			matches your global filters, unless the title is in your library.
		</li>
		<li>
			<strong>Always unless the title is in the library and not dropped</strong> - Show a warning
			when a title matches your global filters, unless the title is in your library and does not
			have the dropped status.
		</li>
	</ul>
	<p>
		<i
			>Tony Mushah: I just copy-pasted what is said on MangaDex Settings page but it works in
			the same way though.</i
		>
	</p>
</section>

<style lang="scss">
	div {
		display: flex;
		align-items: center;
		gap: 6px;
		h3 {
			margin: 0px;
		}
	}
	p {
		margin: 0px;
	}
	select {
		border: 3px var(--mid-tone) solid;
		font-family: var(--fonts);
		font-weight: 800;
		padding: 2px;
		border-radius: 3px;
	}
</style>
