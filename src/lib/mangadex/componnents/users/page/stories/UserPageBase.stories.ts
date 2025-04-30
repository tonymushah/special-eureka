import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";
import profilePicture from "../images/story-profile-picture.jpg";
import profileBanner from "../images/story-profile-banner.jpg";

import UsersPageBase from "../UsersPageBase.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/users/page/Base",
	component: UsersPageBase,
	tags: ["autodocs"]
} satisfies Meta<UsersPageBase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: "Should I even bother to write a title??",
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet dolorem, corporis neque placeat distinctio enim, nihil, doloremque iste quaerat expedita qui facere iure est ea obcaecati corrupti ab consectetur nam?",
		profileBanner,
		profilePicture
	}
};
