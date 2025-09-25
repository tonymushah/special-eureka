<script lang="ts">
	import { dev } from "$app/environment";
	import {
		check_for_updates,
		download_and_install_updates
	} from "@special-eureka/core/commands/updater";
	import { createMutation, createQuery } from "@tanstack/svelte-query";
	import Markdown from "svelte-exmarkdown";

	const query = createQuery({
		queryKey: ["updates"],
		async queryFn() {
			try {
				return await check_for_updates();
			} catch (e) {
				if (e instanceof Error) {
					throw e;
				} else {
					throw new Error(String(e));
				}
			}
		}
	});
	const updateMutation = createMutation({
		mutationKey: ["update"],
		async mutationFn() {
			try {
				return await download_and_install_updates();
			} catch (e) {
				if (e instanceof Error) {
					throw e;
				} else {
					throw new Error(String(e));
				}
			}
		}
	});
</script>

{#snippet updateButton()}
	<button
		class="update-button"
		disabled={$updateMutation.isPending}
		onclick={() => {
			$updateMutation.mutate();
		}}
	>
		Update
	</button>
{/snippet}

<h2>Updates</h2>

<section>
	{#if $query.isLoading}
		<p class="loading">Loading...</p>
	{:else if $query.isError}
		<h3
			class="error"
			onclick={() => {
				$query.refetch();
			}}
		>
			{$query.error.message}
		</h3>
	{:else if $query.isFetched}
		{#if $query.data}
			<div>
				<h4>New version: {$query.data.version}</h4>
				{#if $query.data.publish_date}
					<p>Publish date: {$query.data.publish_date}</p>
				{/if}
				{#if $query.data.description}
					<Markdown md={$query.data.description} />
				{/if}
				{#if $updateMutation.isError}
					<div class="mutate-error">
						{$updateMutation.error}
					</div>
				{/if}
				<div class="update-button-container">
					{@render updateButton()}
				</div>
			</div>
		{:else}
			<h3 class="no-updates">No updates</h3>
		{/if}
	{/if}
	{#if dev && ($query.data == undefined || $query.data == null)}
		<div class="update-button-container">
			{@render updateButton()}
		</div>
	{/if}
</section>

<style class="scss">
	h2 {
		margin: 0px;
		text-align: center;
		padding-top: 16px;
		text-decoration: underline;
	}
	section {
		padding: 0em 2em;
	}
	.error {
		color: #ffc2db;
		text-align: center;
		margin: 0px;
		padding: 5em 0em;
	}
	.loading {
		text-align: center;
		margin: 0px;
	}
	.error:hover {
		text-decoration: underline;
	}
	.update-button {
		font-size: 24px;
		font-family: inherit;
		padding: 0.25em 2em;
		color: black;
		font-weight: 800;
		background-color: #ffed4d;
		border: 3px solid black;
		box-shadow: 0px 3px 0px black;
		border-radius: 3px;
	}
	.update-button:hover {
		background-color: #ffae4d;
	}
	.update-button:active {
		transform: translateY(3px);
		box-shadow: none;
	}
	.update-button-container {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 4px;
	}
	.no-updates {
		text-align: center;
	}
</style>
