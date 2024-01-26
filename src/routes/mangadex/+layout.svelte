<script lang="ts">
	import { client } from "@mangadex/gql/urql";
	import { SvelteUIProvider, createTheme } from "@svelteuidev/core";
	import { setContextClient } from "@urql/svelte";
    import "@fontsource/poppins";
    import "@fontsource-variable/josefin-sans";
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