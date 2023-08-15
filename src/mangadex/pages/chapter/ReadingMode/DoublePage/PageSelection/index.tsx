import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, IconButton, Menu, MenuButton, MenuList, Skeleton, MenuItem, Icon } from "@chakra-ui/react";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { _getLastInURL_ } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";
import { useStoryBookRTLSwipperMode } from "@mangadex/resources/storybook/hooks/user-option/RTLMode";
import React from "react";
import { useDoublePageChapter_ReadingStateData, useDoublePageReadingStateMutation } from "../ActualDoublePage/hooks";

export default function PageSelection({ chapter }: {
    chapter: Chapter
}) {
    const [isTranstion, startTransition] = React.useTransition();
    const { state, images } = useDoublePageChapter_ReadingStateData(chapter);
    const page = React.useMemo(() => {
        return state?.current;
    }, [state?.current]);

    const limit = React.useMemo(() => {
        return images?.length;
    }, [images]);

    const { mutate } = useDoublePageReadingStateMutation(chapter);
    const setPage = React.useCallback((input: number) => {
        startTransition(() => {
            mutate(input);
        });
    }, [mutate, page]);

    const rtl_mode = useStoryBookRTLSwipperMode({
        initialData: false
    });

    const onNext = React.useCallback(() => {
        startTransition(() => {
            if (page != undefined && limit != undefined) {
                if (page >= 0 && page < (limit - 1)) {
                    setPage(page + 1);
                }
            }
        });
    }, [page, limit]);

    const onPrevious = React.useCallback(() => {
        startTransition(() => {
            if (page != undefined && limit != undefined) {
                if (page > 0 && page < limit) {
                    setPage(page - 1);
                }
            }
        });
    }, [page, limit]);

    return (
        <ButtonGroup
            isAttached
        >
            <IconButton
                aria-label="previous"
                icon={
                    <Icon as={ChevronLeftIcon} />
                }
                isLoading={isTranstion}
                isDisabled={page != undefined && limit != undefined ? (page <= 0) : undefined}
                onClick={rtl_mode.query.data == false ? onPrevious : onNext}
            />
            <Menu>
                <MenuButton
                    as={Button}
                    isLoading={isTranstion}
                    rightIcon={<Icon as={ChevronDownIcon} />}
                >
                    {(page ?? 0) + 1} / {parseInt(_getLastInURL_(images?.at((limit ?? 1) - 1)?.[1])?.match(/\d+/)?.[0] ?? "0") ?? (
                        <Skeleton />
                    )}
                </MenuButton>
                <MenuList height={"sm"} overflow={"scroll"}>
                    {
                        images?.map((value, index) => {
                            if (typeof value == "string") {
                                return (
                                    <MenuItem
                                        key={`${JSON.stringify(value)}--__--__--${index}`}
                                        onClick={() => {
                                            startTransition(() => {
                                                setPage(index);
                                            });
                                        }}
                                    >
                                        {
                                            parseInt(_getLastInURL_(value)?.match(/\d+/)?.[0] ?? "0")
                                        }
                                    </MenuItem>
                                );
                            } else {
                                return (
                                    <MenuItem
                                        key={`${JSON.stringify(value)}--__--__--${index}`}
                                        onClick={() => {
                                            startTransition(() => {
                                                setPage(index);
                                            });
                                        }}
                                    >
                                        {
                                            parseInt(_getLastInURL_(value[0])?.match(/\d+/)?.[0] ?? "0")
                                        } - {
                                            parseInt(_getLastInURL_(value[1])?.match(/\d+/)?.[0] ?? "0")
                                        }
                                    </MenuItem>
                                );
                            }
                        }) ?? (
                            <React.Fragment />
                        )
                    }
                </MenuList>
            </Menu>
            <IconButton
                isLoading={isTranstion}
                aria-label="next"
                isDisabled={page != undefined && limit != undefined ? (page >= limit - 1) : undefined}
                onClick={rtl_mode.query.data == false ? onNext : onPrevious}
                icon={
                    <Icon as={ChevronRightIcon} />
                }
            />
        </ButtonGroup>
    );
}