import { Meta, StoryObj } from "@storybook/react";
import ChapterImage from "./index";
import { useHotkeys } from "react-hotkeys-hook";
import MangadexNotFound from "@mangadex/resources/imgs/cover-not-found.jpg";
import { ChakraProvider } from "@chakra-ui/react";

type Story = StoryObj<typeof ChapterImage>;

const meta: Meta<typeof ChapterImage> = {
    component: ChapterImage
};

export default meta;

export const Default: Story = {
    render: () => {
        const ref = useHotkeys<HTMLDivElement>("*", () => {
            console.log("key pressed");
        });
        return (
            <ChakraProvider>
                <ChapterImage
                    src={MangadexNotFound}
                    previous_next_ref={ref}
                />
            </ChakraProvider>
        );
    }
};