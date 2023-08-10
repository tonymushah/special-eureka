import { ChapterPage_outlet_context } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";
import Providers from "@mangadex/resources/storybook/Providers";
import { Meta, StoryObj } from "@storybook/react";
import chapter, { images } from "../tests/images/250f091f-4166-4831-9f45-89ff54bf433b";
import ActualPage from "./index";
import ChapterReadingOption from "@mangadex/resources/storybook/componnents/ChapterReadingOption";

type Story = StoryObj<typeof ActualPage>;

const meta: Meta<typeof ActualPage> = {
    component: ActualPage
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
                <ChapterReadingOption data={data}/>
                <ActualPage
                    data={data}
                />
            </Providers>
        );
    }
};