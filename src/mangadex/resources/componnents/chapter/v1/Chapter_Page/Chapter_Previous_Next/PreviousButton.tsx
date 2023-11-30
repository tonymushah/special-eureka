import * as ChakraIcon from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "@router";
import { useChapter_Previous_NextAggregate } from ".";

export function PreviousButton({ rightIcon }: {
    rightIcon?: boolean;
}) {
    const { aggregate, chapter } = useChapter_Previous_NextAggregate();
    const icon = React.useMemo(() => rightIcon == true ? <ChakraIcon.ArrowRightIcon /> : <ChakraIcon.ArrowLeftIcon />, [rightIcon]);
    const queryKey = React.useMemo(() => ["mdx", "chapter", chapter.get_id(), "previous"], [chapter]);
    const query = useQuery(queryKey, () => aggregate.getPrevious(chapter.get_id()), {
        retry() {
            return false;
        },
    });
    const navigate_ = useNavigate();
    const navigate = React.useCallback(() => {
        if (query.isSuccess) {
            navigate_("/mangadex/chapter/:id", {
                params: {
                    id: query.data
                }
            });
        }
    }, [navigate_, query]);
    if (query.isSuccess) {
        return (
            <Chakra.IconButton aria-label="previous chapter" onClick={navigate} icon={icon} />
        );
    } else if (query.isError) {
        return (
            <Chakra.IconButton aria-label="no previous chapter" isDisabled icon={icon} />
        );
    } else {
        return (
            <Chakra.IconButton aria-label="previous chapter loading" isLoading icon={icon} />
        );
    }
}
