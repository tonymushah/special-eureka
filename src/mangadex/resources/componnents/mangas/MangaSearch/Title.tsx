import { useAtom } from "jotai";
import { search_option_value_title } from "./atoms";
import { FormControl, FormLabel, Heading, HStack, Input, IconButton } from "@chakra-ui/react";
import { RiFilterFill } from "react-icons/ri";

export default function Title({onToggle}: {
    onToggle : () => void
}) {
    const [title, setTitle] = useAtom(search_option_value_title);
    return (
        <FormControl
        >
            <FormLabel>
                <Heading size={"lg"} fontFamily={"inherit"}>
                    Title
                </Heading>
            </FormLabel>
            <HStack>
                <Input
                    name={"title"}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    value={title}
                    type="search"
                />
                <IconButton background={"gray.200"} _hover={{
                    background: "gray.400"
                }} aria-label="Filter" onClick={onToggle} icon={<RiFilterFill />} />
            </HStack>
        </FormControl>
    );
}