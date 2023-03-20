import * as ChakraIcon from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { UseMutationResult } from "react-query";
import { get_ChapterbyId, useChapterDownloadMutation, ChapterDeleteMutation_data, useChapterDeleteMutation } from "@mangadex/resources/hooks/ChapterStateHooks";
import React from "react";
export default function ChapterDownloadButton(props: {
    chapter: Chapter,
    downloadMutation?: UseMutationResult<ChapterDeleteMutation_data, unknown, void>,
    deleteMutation?: UseMutationResult<ChapterDeleteMutation_data, unknown, void>
}) {
    let downloadMutation: UseMutationResult<ChapterDeleteMutation_data, unknown, void> | undefined = props.downloadMutation;
    let deleteMutation: UseMutationResult<ChapterDeleteMutation_data, unknown, void> | undefined = props.deleteMutation;
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
    if (deleteMutation == undefined) {
        deleteMutation = useChapterDeleteMutation({
            chapID: props.chapter.get_id(),
            toInvalidate: [
                queryKey
            ]
        })
    }
    return (
        <React.Fragment>
            {
                downloadMutation?.isLoading ? (<Chakra.Spinner size={"md"} />) : (
                    query.isLoading ? (<Chakra.Spinner size={"md"} />) : (
                        query.isSuccess ? (
                            query.data.isDownloaded ? (
                                query.data.hasFailed == true ? (
                                    <Chakra.HStack>
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
                                        <Chakra.Tooltip
                                            label="Delete Chapter"
                                        >
                                            <ChakraIcon.DeleteIcon
                                                color={"red.500"}
                                                _hover={{
                                                    color: "red"
                                                }}
                                                onClick={() => {
                                                    deleteMutation?.mutate()
                                                }}
                                            />
                                        </Chakra.Tooltip>
                                    </Chakra.HStack>
                                ) : (
                                    <Chakra.HStack>
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
                                        <Chakra.Tooltip
                                            label="Delete Chapter"
                                        >
                                            <ChakraIcon.DeleteIcon
                                                color={"red.500"}
                                                _hover={{
                                                    color: "red"
                                                }}
                                                onClick={() => {
                                                    deleteMutation?.mutate()
                                                }}
                                            />
                                        </Chakra.Tooltip>
                                    </Chakra.HStack>
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
            }
        </React.Fragment>
    )
}