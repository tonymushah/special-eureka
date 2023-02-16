import * as ChakraIcon from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import { Chapter } from "../../../../api/structures/Chapter";
import { UseMutationResult } from "react-query";
import { get_ChapterbyId, useChapterDownloadMutation } from "../../../../resources/hooks/ChapterStateHooks";
export default function ChapterDownloadButton(props: {
    chapter: Chapter,
    downloadMutation?: UseMutationResult<string[], unknown, void>
}) {
    let downloadMutation: UseMutationResult<string[], unknown, void> | undefined = props.downloadMutation;
    const { queryKey, query } = get_ChapterbyId({
        id: props.chapter.get_id()
    });
    if (downloadMutation == undefined) {
        downloadMutation = useChapterDownloadMutation({
            chapID: props.chapter.get_id(),
            toInvalidate: [
                queryKey
            ]
        })
    }
    return (
        <>
            {
                downloadMutation?.isLoading ? (<Chakra.Spinner size={"md"} />) : (
                    query.isLoading ? (<Chakra.Spinner size={"md"} />) : (
                        query.isSuccess ? (
                            query.data.isDownloaded ? ( 
                                query.data.hasFailed == true ? (
                                    <Chakra.Tooltip
                                        label="Some images are missing"
                                    >
                                        <ChakraIcon.WarningIcon
                                            color={"orange"}
                                            _hover={{
                                                color: "orange.500"
                                            }}
                                            onClick={() => {
                                                downloadMutation?.mutate()
                                            }}
                                        />
                                    </Chakra.Tooltip>
                                ) : (
                                    <Chakra.Tooltip
                                        label="Downloaded Chapter"
                                    >
                                        <ChakraIcon.CheckIcon
                                            color={"green.500"}
                                            _hover={{
                                                color: "green"
                                            }}
                                            onClick={() => {
                                                downloadMutation?.mutate()
                                            }}
                                        />
                                    </Chakra.Tooltip>
                                )
                            ) : (
                                <ChakraIcon.DownloadIcon _hover={{
                                    color: "blue"
                                }} onClick={() => {
                                    downloadMutation?.mutate()
                                }} />
                            )
                        ) : (
                            <ChakraIcon.WarningIcon />
                        )
                    )
                )
            }</>
    )
}