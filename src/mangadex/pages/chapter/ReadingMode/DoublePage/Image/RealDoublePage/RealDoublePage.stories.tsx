import { Meta, StoryObj } from "@storybook/react";
import RealDoublePageImage from "./index";
import MangadexNotFound from "@mangadex/resources/imgs/cover-not-found.jpg";
import { ChakraProvider } from "@chakra-ui/react";

type Story = StoryObj<typeof RealDoublePageImage>;

const meta: Meta<typeof RealDoublePageImage> = {
    component: RealDoublePageImage
};

export default meta;

export const Default: Story = {
    render: () => {
        return (
            <ChakraProvider>
                <RealDoublePageImage
                    src={[MangadexNotFound, MangadexNotFound]}
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