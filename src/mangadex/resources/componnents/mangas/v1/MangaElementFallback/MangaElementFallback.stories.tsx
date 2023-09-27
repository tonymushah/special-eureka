import { Meta, StoryObj } from "@storybook/react";
import FallBack from "./index";
import Providers from "@mangadex/resources/storybook/Providers";

type Story = StoryObj<typeof FallBack>;

const meta : Meta<typeof FallBack> = {
    component : FallBack
};

export default meta;

export const Default : Story = {
    render(){
        return (
            <Providers>
                <FallBack/>
            </Providers>
        );
    }
};