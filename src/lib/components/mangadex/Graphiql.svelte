<script lang="ts">
    import type { Fetcher } from "@graphiql/toolkit";
	import { onMount, onDestroy } from 'svelte';
	import ReactDOM from 'react-dom/client';
    import Graphiql from "graphiql";
	import React from 'react';
    import { invoke } from "@tauri-apps/api"

    import "graphiql/graphiql.min.css";

    const fetcher: Fetcher =async (params) => {
        let [res, _] = await invoke<[string, boolean]>("plugin:mangadex-desktop-api|graphql", params);
        return JSON.parse(res);
    }
    const e = React.createElement;

	let container: HTMLDivElement | null = null;
	let root: ReactDOM.Root | null = null;

	onMount(() => {
		try {
			if (container != null) {
				root = ReactDOM.createRoot(container);
				root.render(e(Graphiql, {
                    fetcher
                }));
			}
		} catch (error) {
			console.warn({ error });
		}
	});

	onDestroy(() => {
        try {
            root?.unmount();
        } catch (error) {
            console.warn({ error });
        }
    });
</script>

<div bind:this={container} class="graphiql-container" />


<style global>
    .graphiql-container {
        height: 100vh;
    }
</style>