<script lang="ts">
	import { client } from "@mangadex/gql/urql";
	import { SvelteUIProvider, createTheme } from "@svelteuidev/core";
	import { setContextClient } from "@urql/svelte";
    import "@fontsource/poppins";
    import "@fontsource-variable/josefin-sans";
	import Sidebar from "$lib/componnents/mangadex/sidebar/Sidebar.svelte";
    setContextClient(client);
    const theme = createTheme({
        fonts: {
            standard: "Poppins"
        }
    });
</script>

<SvelteUIProvider theme={theme}>
    <Sidebar/>
    <slot/>
</SvelteUIProvider>