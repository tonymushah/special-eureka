<script lang="ts">
	import { client } from "@mangadex/gql/urql";
	import { SvelteUIProvider, createTheme } from "@svelteuidev/core";
	import { setContextClient } from "@urql/svelte";
    import "@fontsource-variable/poppins";
    setContextClient(client);
    const theme = createTheme({
        fonts: {
            standard: "Poppins"
        }
    });
</script>

<SvelteUIProvider theme={theme}>
    <slot/>
</SvelteUIProvider>