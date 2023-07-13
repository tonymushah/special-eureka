import { useAtom } from "jotai";
import { search_option_value, search_option_value_status } from "./atoms";
import { AddIcon } from "@chakra-ui/icons";
import { FormControl, FormLabel, Heading, Wrap, WrapItem, Tag, TagLeftIcon, TagLabel } from "@chakra-ui/react";
import { make_first_UpperCare } from "@mangadex/api/internal/Utils";
import { ReallySimpleCard } from "./ReallySimpleCard";

export default function StatusComp() {
    const [, setStatus] = useAtom(search_option_value_status);
    const [{status},] = useAtom(search_option_value);
    return (
        <ReallySimpleCard>
            <FormControl>
                <FormLabel>
                    <Heading size={"lg"} fontFamily={"inherit"}>
                        Publication Status
                    </Heading>
                </FormLabel>
                <Wrap>
                    {status.map((value, index, arr) => {
                        const array = arr;
                        return (
                            <WrapItem key={`status${index}`}>
                                <Tag colorScheme={value.include ? "orange" : undefined} variant={value.include ? "solid" : undefined} size={"lg"} onClick={() => {
                                    array[index].include = !(array[index].include);
                                    setStatus(array);
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