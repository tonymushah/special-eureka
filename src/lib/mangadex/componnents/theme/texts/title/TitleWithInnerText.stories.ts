import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";

import Title from "./TitleWithInnerText.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/theme/title/Title",
	component: Title,
	tags: ["autodocs"],
	argTypes: {
		type: {
			name: "type",
			type: {
				name: "enum",
				value: [1, 2, 3, 4, 5, 6]
			}
		}
	}
} satisfies Meta<Title>;

export default meta;

type Story = StoryObj<typeof meta>;

const innerText = "Reiciendis occaecati cum assumenda aut et ducimus repellendus.";

export const Title1: Story = {
	args: {
		type: 1,
		innerText
	}
};

export const Title2: Story = {
	args: {
		type: 2,
		innerText
	}
};

export const Title3: Story = {
	args: {
		type: 3,
		innerText
	}
};

export const Title4: Story = {
	args: {
		type: 4,
		innerText
	}
};

export const Title5: Story = {
	args: {
		type: 5,
		innerText
	}
};

export const Title6: Story = {
	args: {
		type: 6,
		innerText
	}
};
