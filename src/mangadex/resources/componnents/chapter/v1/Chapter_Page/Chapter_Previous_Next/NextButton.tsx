import * as ChakraIcon from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import { useMangaDexPath } from "@mangadex/index";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useChapter_Previous_NextAggregate } from ".";

export function NextButton({ leftIcon }: {
    leftIcon?: boolean;
}) {
    const { aggregate, chapter } = useChapter_Previous_NextAggregate();
    const icon = React.useMemo(() => leftIcon == true ? <ChakraIcon.ArrowLeftIcon /> : <ChakraIcon.ArrowRightIcon />, [leftIcon]);
    const queryKey = React.useMemo(() => ["mdx", "chapter", chapter.get_id(), "next"], [chapter]);
    const query = useQuery(queryKey, () => aggregate.getNext(chapter.get_id()), {
        retry() {
            return false;
        },
    });
    const navigate = useNavigate();
    const mangaDexPath = useMangaDexPath();
    if (query.isSuccess) {
        return (
            <Chakra.IconButton aria-label="Next chapter" onClick={() => navigate(`${mangaDexPath}/chapter/${query.data}`)} icon={icon} />
        );
    } else if (query.isError) {
        return (
            <Chakra.IconButton aria-label="no next chapter" isDisabled icon={icon} />
        );
    } else {
        return (
            <Chakra.IconButton aria-label="next chapter loading" isLoading icon={icon} />
        );
    }
}
