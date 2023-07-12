import { Text } from "@chakra-ui/react";
import { usePropsChapter } from "@mangadex/resources/componnents/chapter/v1/PropsContext";
import React from "react";

export default function Title() {
    const { chapter } = usePropsChapter();
    return (
        <Text as={"span"} noOfLines={1}>
            &nbsp;
            {
                chapter.get_volume() != null ? (
                    <React.Fragment>Volume {chapter.get_volume()}</React.Fragment>
                ) : (<React.Fragment />)
            }
            &nbsp;
            Chapter {chapter.get_chapter()} {
                chapter.get_title() == null || chapter.get_title() == "" ? (<React.Fragment/>) : (<React.Fragment> - {chapter.get_title()}</React.Fragment>)
            }
        </Text>
    );
}