import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        '@chakra-ui/storybook-addon',
        "storybook-addon-react-router-v6"
    ],
    core: {
        builder: '@storybook/builder-vite',
    },
    framework: {
        name: "@storybook/react-vite",
        options: {
            "builder": {
                "viteConfigPath": "./vite.storybook.config.ts"
            }
        },
    },
    docs: {
        autodocs: "tag",
    },
};
export default config;
