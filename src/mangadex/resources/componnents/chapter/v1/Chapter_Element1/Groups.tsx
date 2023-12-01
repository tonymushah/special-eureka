import TryCatch from "@commons-res/components/TryCatch";
import { getMangaDexPath } from "@mangadex/index";
import { get_chapter_groups } from "@mangadex/resources/hooks/ChapterStateHooks/get_chapter_groups";
import React from "react";
import { Link } from "@router";
import * as Chakra from "@chakra-ui/react";
import { usePropsChapter } from "../PropsContext";

export default function Groups() {
    const { chapter } = usePropsChapter();
    const MangaDexPath = React.useMemo(() => getMangaDexPath(), []);
    const groups_query = get_chapter_groups({
        chapter
    });
    if (groups_query.length == 0) {
        return (
            <React.Fragment />
        );
    } else {
        return (
            <React.Fragment>
                {
                    groups_query.map((value) => {
                        if (value.isLoading) {
                            return (
                                <Chakra.WrapItem key={Math.random() * 100}>
                                    <Chakra.Text as={"i"} >Loading...</Chakra.Text>
                                </Chakra.WrapItem>
                            );
                        }
                        if (value.isError) {
                            return (
                                <Chakra.WrapItem key={Math.random() * 100}>
                                    <Chakra.Text as={"i"} >No Groups</Chakra.Text>
                                </Chakra.WrapItem>
                            );
                        }
                        if (value.isSuccess) {
                            return (
                                <Chakra.WrapItem key={value.data.get_id()}>
                                    <TryCatch
                                        catch={() => (
                                            <Chakra.Link>{value.data.get_name()}</Chakra.Link>
                                        )}
                                    >
                                        <Link
                                            to={"/mangadex/group/:id"}
                                            params={{
                                                id: value.data.get_id()
                                            }}
                                        >
                                            {value.data.get_name()}
                                        </Link>
                                    </TryCatch>
                                </Chakra.WrapItem>
                            );
                        }
                        return (<React.Fragment key={Math.random() * 100} />);
                    })
                }

            </React.Fragment>
        );
    }
}