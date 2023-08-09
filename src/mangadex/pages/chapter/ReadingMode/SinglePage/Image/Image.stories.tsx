import { Meta, StoryObj } from "@storybook/react";
import ChapterImage from "./index";
import MangadexNotFound from "@mangadex/resources/imgs/cover-not-found.jpg";
import { ChakraProvider } from "@chakra-ui/react";

type Story = StoryObj<typeof ChapterImage>;

const meta: Meta<typeof ChapterImage> = {
    component: ChapterImage
};

export default meta;

export const Default: Story = {
    render: () => {
        return (
            <ChakraProvider>
                <ChapterImage
                    src={MangadexNotFound}
                    onNext={() => {
                        console.log("next");
                    }}
                    onPrevious={() => {
                        console.log("previous");
                    }}
                />
            </ChakraProvider>
        );
    }
};