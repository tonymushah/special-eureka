import { ThemeConfig, extendTheme } from "@chakra-ui/react";

const config: ThemeConfig = {
    initialColorMode: "system",
    useSystemColorMode: true,
};

const theme = extendTheme({
    config,
    fonts: {
        heading: "'Josefin Sans Variable', sans-serif",
        body: "'Poppins', 'Josefin Sans Variable' , sans-serif",
    }
});

export default theme;