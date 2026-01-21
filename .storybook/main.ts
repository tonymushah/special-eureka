import type { StorybookConfig } from "@storybook/sveltekit";

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx|svelte)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-a11y",
		"@chromatic-com/storybook",
		"@storybook/addon-docs",
		"@storybook/addon-svelte-csf"
	],
	framework: {
		name: "@storybook/sveltekit",
		options: {}
	},
	docs: {},
	staticDirs: ["../public", "../static"]
};
export default config;
