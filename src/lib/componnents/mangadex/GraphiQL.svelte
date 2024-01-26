<script lang="ts">
	import 'graphiql/graphiql.min.css';
	import { createRoot, type Root } from 'react-dom/client';
	import { onDestroy, onMount } from 'svelte';
	import { GraphiQL } from 'graphiql';
	import { invoke } from '@tauri-apps/api';
	import type { Fetcher } from '@graphiql/toolkit';
	import { pluginName } from '@mangadex/const';

	const fetcher: Fetcher = async (params) => {
        let [stringData, _] = await invoke<[string, boolean]>(`plugin:${pluginName}|graphql`, params);
        return JSON.parse(stringData);
    };

    let divRoot: HTMLElement | undefined;
	let root: Root | undefined;
	
	onMount(function () {
		if (divRoot != undefined) {
			if (root != undefined) {
				root.unmount();
			} else {
				root = createRoot(divRoot);
			}
			root.render(
				GraphiQL({
					fetcher
				})
			);
		}
	});
    
    onDestroy(function () {
        if(root != undefined) root.unmount();
    });

</script>

<div bind:this={divRoot} />

<style>
    div {
        height: 100vh;
    }
</style>