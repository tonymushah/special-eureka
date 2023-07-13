import { useAtom } from "jotai";
import { search_option_value, search_option_value_content_rating } from "./atoms";
import { AddIcon } from "@chakra-ui/icons";
import { FormControl, FormLabel, Heading, Wrap, WrapItem, Tag, TagLeftIcon, TagLabel } from "@chakra-ui/react";
import { make_first_UpperCare } from "@mangadex/api/internal/Utils";
import { ReallySimpleCard } from "./ReallySimpleCard";

export default function CttRtgComp_() {
    const [, setContent_Rating] = useAtom(search_option_value_content_rating);
    const [{content_rating}, ] = useAtom(search_option_value);
    return (
        <ReallySimpleCard>
            <FormControl
            >
                <FormLabel>
                    <Heading size={"lg"} fontFamily={"inherit"}>
                        Content Rating
                    </Heading>
                </FormLabel>
                <Wrap>
                    {content_rating.map((value, index, arr) => {
                        const array = arr;
                        return (
                            <WrapItem key={`content_rating${index}`}>
                                <Tag colorScheme={value.include ? "orange" : undefined} variant={value.include ? "solid" : undefined} size={"lg"} onClick={() => {
                                    array[index].include = !(array[index].include);
                                    setContent_Rating(array);
                                }}>
                                    <TagLeftIcon boxSize={"12px"} as={value.include ? AddIcon : undefined} />
                                    <TagLabel>{make_first_UpperCare(value.name)}</TagLabel>
                                </Tag>
                            </WrapItem>
                        );
                    })}
                </Wrap>
            </FormControl>
        </ReallySimpleCard>
    );
}