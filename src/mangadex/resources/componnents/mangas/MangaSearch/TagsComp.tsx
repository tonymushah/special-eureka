import { FormControl, FormLabel, Heading } from "@chakra-ui/react";
import Tags from "./Tags";
import { ReallySimpleCard } from "./ReallySimpleCard";

export default function TagsComp() {
    return (
        <ReallySimpleCard>
            <FormControl>
                <FormLabel>
                    <Heading size={"lg"} fontFamily={"inherit"}>
                        Tags
                    </Heading>
                </FormLabel>
                <Tags />
            </FormControl>
        </ReallySimpleCard>
    );
}