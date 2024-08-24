import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import MidtoneLine from "./FormInput.svelte";
import MangadexThemeProviderForStory from "../../MangadexThemeProviderForStory.svelte";

const meta = {
    decorators: [() => MangadexThemeProviderForStory],
    title: "MangaDex/theme/form/Input",
    component: MidtoneLine,
    tags: ["autodocs"]
} satisfies Meta<MidtoneLine>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
