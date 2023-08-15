import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Skeleton } from "@chakra-ui/react";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { _getLastInURL_ } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";
import React from "react";
import useState from "./hooks";

export default function PageSelection({ chapter }: {
    chapter: Chapter
}) {
    const {
        isTranstion,
        isNextDisabled,
        isPreviousDisabled,
        current,
        onPrevious,
        onNext,
        rtl_mode,
        startTransition,
        images,
        setPage,
        limit
    } = useState(chapter);
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
                isDisabled={rtl_mode.query.data == false ? isPreviousDisabled : isNextDisabled}
                onClick={rtl_mode.query.data == false ? onPrevious : onNext}
            />
            <Menu>
                <MenuButton
                    as={Button}
                    isLoading={isTranstion}
                    rightIcon={<Icon as={ChevronDownIcon} />}
                >
                    {(
                        current
                    )} / {parseInt(_getLastInURL_(images.data?.at((limit ?? 1) - 1)?.[1])?.match(/\d+/)?.[0] ?? "0") ?? (
                        <Skeleton />
                    )}
                </MenuButton>
                <MenuList height={"sm"} overflow={"scroll"}>
                    {
                        images.data?.map((value, index) => {
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
                isDisabled={rtl_mode.query.data == false ? isNextDisabled : isPreviousDisabled}
                onClick={rtl_mode.query.data == false ? onNext : onPrevious}
                icon={
                    <Icon as={ChevronRightIcon} />
                }
            />
        </ButtonGroup>
    );
}