import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions'
    ],
    babel(c, o) {
        return {
            ...c,
            "exclude": "**/src-tauri/**"
        }
    },
    swc(c, o) {
        return {
            ...c,
            "exclude": "**/src-tauri/**"
        }
    },
    framework: {
        name: '@storybook/sveltekit',
        options: {}
    },
    docs: {
        autodocs: 'tag'
    },
    staticDirs: ["../public", "../static"]
};
export default config;