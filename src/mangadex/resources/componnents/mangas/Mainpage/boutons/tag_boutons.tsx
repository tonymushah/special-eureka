import React from "react";
import { make_first_UpperCare } from "@mangadex/api/internal/Utils";
import { Tag } from "@mangadex/api/structures/Tag";
import { VStack, Button, Wrap, WrapItem, Heading, useToken } from "@chakra-ui/react";

export function TagButton(props: {
    src: Tag
}) {
    const gray500 = useToken("colors", "gray.500");
    const tag_toUse: Tag = props.src;
    return (
        <Button style={{
            fontWeight: "800"
        }}
            colorScheme={"gray"}
            boxShadow={`0px 0px 5px ${gray500}`}
            variant={"solid"}
            size="sm"
        >
            {tag_toUse.get_name().en}
        </Button>
    );
}
type TagRowProps = {
    src: Array<Tag>,
    title: string;
}

export function TagRow(props: TagRowProps) {
    if (props.src.length != 0) {
        return (
            <VStack display={"block"}>
                <Heading size={"md"} fontFamily={"inherit"}>{make_first_UpperCare(props.title)}</Heading>
                <Wrap>
                    {props.src.map((iteme, index) => (
                        <WrapItem key={`${props.title}-${index}`}>
                            <TagButton src={iteme} />
                        </WrapItem>
                    ))}
                </Wrap>
            </VStack>
        );
    } else {
        return (<React.Fragment />);
    }
}