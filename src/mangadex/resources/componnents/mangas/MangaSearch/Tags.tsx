import { useAtom } from "jotai";
import { search_option_value, search_option_value_tags } from "./atoms";
import { Wrap, WrapItem, Heading, Box } from "@chakra-ui/react";
import { make_first_UpperCare } from "@mangadex/api/internal/Utils";
import AllTagConsumer from "../../tag/AllTagConsumer";
import { TagGroupSplitterProvider, EachTagGroupConsumer } from "../../tag/TagSplitter";
import { Tag_Insertion_ } from "./Tag_Insertion_";

export default function Tags() {
    const [, setTags] = useAtom(search_option_value_tags);
    const [{tags},] = useAtom(search_option_value);
    return (
        <AllTagConsumer>
            {(d) => (
                <TagGroupSplitterProvider tags={d} >
                    <Wrap>
                        <EachTagGroupConsumer>
                            {(tag) => (
                                <WrapItem>
                                    <Box>
                                        <Heading size="md" fontFamily={"inherit"}>{make_first_UpperCare(tag.key)}</Heading>
                                        <Wrap>
                                            {tag.data.map((b_value) => <Tag_Insertion_
                                                tag={b_value}
                                                array={tags}
                                                key={b_value.get_id()}
                                                onClick={(d) => setTags(d)}
                                            />)}
                                        </Wrap>
                                    </Box>
                                </WrapItem>
                            )}
                        </EachTagGroupConsumer>
                    </Wrap>
                </TagGroupSplitterProvider>
            )}
        </AllTagConsumer>
    );
}