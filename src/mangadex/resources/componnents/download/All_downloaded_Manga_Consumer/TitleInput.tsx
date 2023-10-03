import { useAtom } from "jotai";
import { titleAtom } from "./atom";
import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FiDelete } from "react-icons/fi";

export default function TitleInput() {
    const [title, setTitle] = useAtom(titleAtom);
    return (
        <Box padding={3}>
            <InputGroup >
                <Input value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                <InputRightElement onClick={() => setTitle("")}>
                    <FiDelete />
                </InputRightElement>
            </InputGroup>
        </Box>
    );
}