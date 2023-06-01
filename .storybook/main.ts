import type { StorybookConfig } from "@storybook/react-vite";
import react from "@vitejs/plugin-react-swc";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    '@chakra-ui/storybook-addon'
  ],
  core: {
    builder: '@storybook/builder-vite',
  },
  framework: {
    name: "@storybook/react-vite",
    options: {
      "builder" : {
        "viteConfigPath" : "./vite.storybook.config.ts"
      }
    },
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
