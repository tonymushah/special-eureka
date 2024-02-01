<script lang="ts">
	import { client } from '@mangadex/gql/urql';
	import { SvelteUIProvider, createTheme, theme as theme_old } from '@svelteuidev/core';
	import { setContextClient } from '@urql/svelte';
	import '@fontsource/poppins';
	import '@fontsource-variable/josefin-sans';
	import Sidebar from '$lib/mangadex/componnents/sidebar/Sidebar.svelte';
    console.log(theme_old);
	const theme = createTheme("mangadex-theme",{
        fonts: {
			standard: 'Poppins'
		}
	});
</script>

<SvelteUIProvider class={theme}>
	<div class="provider">
		<Sidebar />
        <div class="inner">
            <slot />
        </div>
	</div>
</SvelteUIProvider>

<style>
	.provider {
		display: flex;
		max-width: 100%;
	}
    .inner {
        margin-left: 1em;
    }
</style>
