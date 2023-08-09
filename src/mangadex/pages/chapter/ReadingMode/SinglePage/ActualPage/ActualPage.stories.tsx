import { ChakraProvider } from "@chakra-ui/react";
import { ChapterPage_outlet_context } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";
import { Meta, StoryObj } from "@storybook/react";
import chapter, { images } from "../tests/images/250f091f-4166-4831-9f45-89ff54bf433b";
import ActualPage from "./index";

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
            <ChakraProvider>
                <ActualPage
                    data={data}
                />
            </ChakraProvider>
        );
    }
};