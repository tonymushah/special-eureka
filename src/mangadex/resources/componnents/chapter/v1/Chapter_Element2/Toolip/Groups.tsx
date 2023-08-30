import * as Chakra from "@chakra-ui/react";
import { get_chapter_groups } from "@mangadex/resources/hooks/ChapterStateHooks/get_chapter_groups";
import randomInteger from "random-int";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { usePropsChapter } from "../../PropsContext";
import { Link } from "react-router-dom";
import { useMangaDexPath } from "@mangadex/index";

export default function Groups() {
    const { chapter } = usePropsChapter();
    const groups_query = get_chapter_groups({
        chapter
    });
    const MangaDexPath = useMangaDexPath();
    return (
        <Chakra.Text margin={0} padding={0}> <Chakra.Icon as={FaUsers} /> {
            groups_query.length == 0 ? (<></>) : (
                groups_query.map((value) => {
                    if (value.isLoading) {
                        return (<React.Fragment key={randomInteger()} />);
                    }
                    if (value.isError) {
                        (<React.Fragment key={randomInteger()} />);
                    }
                    if (value.isSuccess) {
                        return (<Chakra.Link key={value.data.get_id()} as={Link} to={MangaDexPath + `/group/${value.data.get_id()}`}>{value.data.get_name()}</Chakra.Link>);
                    }
                    return (
                        <React.Fragment key={randomInteger()} />
                    );
                })
            )
        }
        </Chakra.Text>
    );
}