import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";
import profilePicture from "../page/images/story-profile-picture.jpg";

import UsersBaseElement from "./UsersSimpleBase.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/users/UserSimpleElement",
	component: UsersBaseElement,
	tags: ["autodocs"]
} satisfies Meta<UsersBaseElement>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		name: "Some big bee",
		profilePicture
	}
};
