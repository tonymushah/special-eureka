import type { Meta, StoryObj } from '@storybook/svelte';

import ButtonAccent from './ButtonAccentOnlyLabel.svelte';
import MangadexThemeProviderForStory from '../MangadexThemeProviderForStory.svelte';

const meta = {
    decorators: [() => MangadexThemeProviderForStory],
    title: "AccentButton",
    component: ButtonAccent,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            type: {
                name: "enum",
                value: ["default", "1", "2", "3", "4", "5"]
            },
        },
        style: {
            "type": "string",
            "name": "Style",
            "description": "The button custom style"
        }
    }
} satisfies Meta<ButtonAccent>;

export default meta;

type Story = StoryObj<typeof meta>;

const label = "Button";

export const Default: Story = {
    args: {
        variant: "default",
        label
    }
}

export const L1: Story = {
    args: {
        variant: "1",
        label
    }
}

export const L2: Story = {
    args: {
        variant: "2",
        label
    }
}

export const L3: Story = {
    args: {
        variant: "3",
        label
    }
}

export const L4: Story = {
    args: {
        variant: "4",
        label
    }
}

export const L5: Story = {
    args: {
        variant: "5",
        label
    }
}

export const Accent: Story = {
    args: {
        variant: "accent",
        label
    }
}

export const AccentAlt: Story = {
    args: {
        variant: "accent-alt",
        label
    }
}