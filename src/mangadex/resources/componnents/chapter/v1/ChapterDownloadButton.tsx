import * as ChakraIcon from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { ChapterDeleteMutation_data } from "@mangadex/resources/hooks/ChapterStateHooks/ChapterDeleteMutation_data";
import { useChapterDeleteMutation } from "@mangadex/resources/hooks/ChapterStateHooks/useChapterDeleteMutation";
import { useChapterDownloadMutation } from "@mangadex/resources/hooks/ChapterStateHooks/useChapterDownloadMutation";
import { get_ChapterbyId } from "@mangadex/resources/hooks/ChapterStateHooks/get_ChapterbyId";
import { UseQueryResult } from "@tanstack/react-query";
import MangadexSpinner from "../../kuru_kuru/MangadexSpinner";

export default function ChapterDownloadButton(props: {
    chapter: Chapter,
    hstackProps?: Chakra.StackProps
}) {
    const { queryKey, query } = get_ChapterbyId({
        id: props.chapter.get_id()
    });
    const downloadMutation: UseQueryResult<ChapterDeleteMutation_data, unknown> = useChapterDownloadMutation({
        chapID: props.chapter.get_id(),
        toInvalidate: [
            queryKey
        ]
    });
    const deleteMutation: UseQueryResult<ChapterDeleteMutation_data, unknown> = useChapterDeleteMutation({
        chapID: props.chapter.get_id(),
        toInvalidate: [
            queryKey
        ]
    });

    if (downloadMutation?.isRefetching) {
        return (<MangadexSpinner size={"md"} />);
    } else if ((downloadMutation.isLoading && downloadMutation.fetchStatus == "fetching")) {
        return (<MangadexSpinner size={"md"} />);
    } else {
        if (query.isSuccess) {
            if (query.data.isDownloaded == true) {
                if (query.data.hasFailed == true) {
                    return (
                        <Chakra.HStack
                            {...props.hstackProps}
                        >
                            <Chakra.Tooltip
                                label="Some images are missing"
                            >
                                <ChakraIcon.WarningIcon
                                    color={"orange"}
                                    _hover={{
                                        color: "orange.500"
                                    }}
                                    onClick={() => {
                                        downloadMutation?.refetch();
                                    }}
                                />
                            </Chakra.Tooltip>
                            <Chakra.Tooltip
                                label="Delete Chapter"
                            >
                                <ChakraIcon.DeleteIcon
                                    color={"red.500"}
                                    _hover={{
                                        color: "red"
                                    }}
                                    transition={"0.5s"}
                                    onClick={() => {
                                        deleteMutation?.refetch();
                                    }}
                                />
                            </Chakra.Tooltip>
                        </Chakra.HStack>
                    );
                } else {
                    return (
                        <Chakra.HStack
                            {...props.hstackProps}
                        >
                            <Chakra.Tooltip
                                label="Downloaded Chapter"
                            >
                                <ChakraIcon.CheckIcon
                                    color={"green.500"}
                                    _hover={{
                                        color: "green"
                                    }}
                                    onClick={() => {
                                        downloadMutation?.refetch();
                                    }}
                                />
                            </Chakra.Tooltip>
                            <Chakra.Tooltip
                                label="Delete Chapter"
                            >
                                <ChakraIcon.DeleteIcon
                                    color={"red.500"}
                                    _hover={{
                                        color: "red"
                                    }}
                                    onClick={() => {
                                        deleteMutation?.refetch();
                                    }}
                                />
                            </Chakra.Tooltip>
                        </Chakra.HStack>
                    );
                }
            } else {
                return (
                    <ChakraIcon.DownloadIcon _hover={{
                        color: "blue"
                    }} onClick={() => {
                        downloadMutation?.refetch();
                    }} />
                );
            }
        } else if (query.isLoading) {
            return (
                <MangadexSpinner size={"md"} />
            );
        } else {
            return (
                <MangadexSpinner size={"md"} />
            );
        }
    }
}