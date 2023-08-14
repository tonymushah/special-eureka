import { Meta, StoryObj } from "@storybook/react";
import DoublePage from "./index";
import chapter, { images } from "../SinglePage/tests/images/250f091f-4166-4831-9f45-89ff54bf433b";
import { ChapterPage_outlet_context } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";
import Providers from "@mangadex/resources/storybook/Providers";

type Story = StoryObj<typeof DoublePage>;

const meta: Meta<typeof DoublePage> = {
    component: DoublePage
};

export default meta;

export const Default: Story = {
    render: () => {
        const data: ChapterPage_outlet_context = {
            chapter,
            images
        };
        return (
            <Providers>
                <DoublePage
                    data={data}
                />
            </Providers>
        );
    }
};