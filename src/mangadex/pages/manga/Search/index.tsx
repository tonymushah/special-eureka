import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { Box, Card, CardBody, CardHeader, Tag, TagLeftIcon, TagLabel, Collapse, Container, FormControl, FormErrorMessage, FormLabel, HStack, Heading, IconButton, Input, StackDivider, VStack, Wrap, WrapItem, useDisclosure } from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Mangadex_suspense__, useTrackEvent } from "@mangadex/index";
import { ContentRating, Offset_limits, Status, make_first_UpperCare } from "@mangadex/api/internal/Utils";
import { Manga, Manga_with_allRelationship } from "@mangadex/api/structures/Manga";
import MangaSearch_withAllIncludes from "@mangadex/api/structures/SearchType/MangaSearch_withAllIncludes";
import CollectionComponnent_WithQuery from "@mangadex/resources/componnents/Collection/CollectionComponnent_WithQuery";
import MyErrorBounderies from "@mangadex/resources/componnents/error/MyErrorBounderies";
import AllTagConsumer from "@mangadex/resources/componnents/tag/AllTagConsumer";
import { EachTagGroupConsumer, TagGroupSplitterProvider } from "@mangadex/resources/componnents/tag/TagSplitter";
import { Client } from "@tauri-apps/api/http";
import { appWindow } from "@tauri-apps/api/window";
import { useFormik } from "formik";
import React from "react";
import { RiFilterFill } from "react-icons/ri";
import { TagInsertion, TagInsertionMode } from "./TagInsertion";
import { Tag_Insertion_ } from "./Tag_Insertion_";
import { Status_include } from "./Status_publ";
import { CttRtg_include } from "./Content_Rating";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";

const MangaList = React.lazy(() => import("@mangadex/resources/componnents/mangas/v1/MangaList"));

export type MangaSearchOption = {
    offset_limit: Offset_limits,
    title?: string,
    tags: TagInsertion[],
    status: Array<Status_include>,
    content_rating: Array<CttRtg_include>
    client: Client
};

function Manga_Search_Result(props: MangaSearch_withAllIncludes) {
    return (
        <MyErrorBounderies>
            <CollectionComponnent_WithQuery<Manga>
                queryKey={["mdx", "manga", "search", `${Math.random() * 100}`]}
                fn={async () => {
                    return await Manga_with_allRelationship.search(props);
                }}
            >
                {
                    (collec) => (
                        <React.Suspense
                            fallback={<Mangadex_suspense__ />}
                        >
                            <MangaList src={collec.get_data()} />
                        </React.Suspense>
                    )
                }
            </CollectionComponnent_WithQuery>
        </MyErrorBounderies>
    );
}

function ReallySimpleCard({ children }: React.PropsWithChildren) {
    return (
        <Card>
            <CardBody>
                {children}
            </CardBody>
        </Card>
    );
}

export default function Manga_Search() {
    const client = useHTTPClient();
    const { isOpen, onToggle, onClose } = useDisclosure();
    const [result, setResult] = React.useState(
        <Manga_Search_Result
            offset_Limits={new Offset_limits()}
            client={client}
        />
    );
    const formik = useFormik<MangaSearchOption>({
        initialValues: {
            offset_limit: new Offset_limits(),
            tags: [],
            status: Status.array().map((d) => ({
                name: d,
                include: false
            })),
            content_rating: ContentRating.array().map((d) => ({
                name: d,
                include: false
            })),
            client: client
        },
        onSubmit(values) {
            onClose();
            const excludedTags: string[] = [];
            const includedTags: string[] = [];
            const status: Array<string> = [];
            const content_rating: Array<string> = [];
            values.tags?.forEach((d) => {
                if (d.mode == TagInsertionMode.Exclude) {
                    excludedTags.push(d.id);
                } else if (d.mode == TagInsertionMode.Include) {
                    includedTags.push(d.id);
                }
            });
            values.status.forEach((d) => {
                if (d.include) {
                    status.push(d.name);
                }
            });
            values.content_rating.forEach((d) => {
                if (d.include) {
                    content_rating.push(d.name);
                }
            });
            setResult(
                <Manga_Search_Result
                    offset_Limits={new Offset_limits()}
                    client={client}
                    title={values.title}
                    excludedTags={excludedTags}
                    includedTags={includedTags}
                    contentRating={content_rating}
                    status={status}
                />
            );
        },
        onReset(values) {
            values.tags = [];
            values.client = client;
        },
    });
    function Tags() {
        return (
            <AllTagConsumer>
                {(d) => (
                    <TagGroupSplitterProvider tags={d} >
                        <Wrap>
                            <EachTagGroupConsumer>
                                {(tag) => (
                                    <WrapItem>
                                        <Box>
                                            <Heading size="md" fontFamily={"inherit"}>{make_first_UpperCare(tag.key)}</Heading>
                                            <Wrap>
                                                {tag.data.map((b_value) => <Tag_Insertion_
                                                    tag={b_value}
                                                    array={formik.values.tags}
                                                    key={b_value.get_id()}
                                                    onClick={(d) => formik.setFieldValue("tags", d)}
                                                />)}
                                            </Wrap>
                                        </Box>
                                    </WrapItem>
                                )}
                            </EachTagGroupConsumer>
                        </Wrap>
                    </TagGroupSplitterProvider>
                )}
            </AllTagConsumer>
        );
    }
    function TagsComp() {
        return (
            <ReallySimpleCard>
                <FormControl
                    isInvalid={(formik.errors.tags ? true : false)}
                >
                    <FormLabel>
                        <Heading size={"lg"} fontFamily={"inherit"}>
                            Tags
                        </Heading>
                    </FormLabel>
                    <Tags />
                    <FormErrorMessage>{JSON.stringify(formik.errors.tags)}</FormErrorMessage>
                </FormControl>
            </ReallySimpleCard>
        );
    }
    function StatusComp() {
        return (
            <ReallySimpleCard>
                <FormControl
                    isInvalid={(formik.errors.status ? true : false)}
                >
                    <FormLabel>
                        <Heading size={"lg"} fontFamily={"inherit"}>
                            Publication Status
                        </Heading>
                    </FormLabel>
                    <Wrap>
                        {formik.values.status.map((value, index, arr) => {
                            const array = arr;
                            return (
                                <WrapItem key={`status${index}`}>
                                    <Tag colorScheme={value.include ? "orange" : undefined} variant={value.include ? "solid" : undefined} size={"lg"} onClick={() => {
                                        array[index].include = !(array[index].include);
                                        formik.setFieldValue("status", array);
                                    }}>
                                        <TagLeftIcon boxSize={"12px"} as={value.include ? AddIcon : undefined} />
                                        <TagLabel>{make_first_UpperCare(value.name)}</TagLabel>
                                    </Tag>
                                </WrapItem>
                            );
                        })}
                    </Wrap>
                </FormControl>
            </ReallySimpleCard>
        );
    }
    function CttRtgComp() {
        return (
            <ReallySimpleCard>
                <FormControl
                    isInvalid={(formik.errors.content_rating ? true : false)}
                >
                    <FormLabel>
                        <Heading size={"lg"} fontFamily={"inherit"}>
                            Content Rating
                        </Heading>
                    </FormLabel>
                    <Wrap>
                        {formik.values.content_rating.map((value, index, arr) => {
                            const array = arr;
                            return (
                                <WrapItem key={`content_rating${index}`}>
                                    <Tag colorScheme={value.include ? "orange" : undefined} variant={value.include ? "solid" : undefined} size={"lg"} onClick={() => {
                                        array[index].include = !(array[index].include);
                                        formik.setFieldValue("content_rating", array);
                                    }}>
                                        <TagLeftIcon boxSize={"12px"} as={value.include ? AddIcon : undefined} />
                                        <TagLabel>{make_first_UpperCare(value.name)}</TagLabel>
                                    </Tag>
                                </WrapItem>
                            );
                        })}
                    </Wrap>
                </FormControl>
            </ReallySimpleCard>
        );
    }
    function FilterCollapse() {
        return (
            <React.Fragment>
                <Wrap spacing={"25px"}>
                    <WrapItem>
                        <CttRtgComp />
                    </WrapItem>
                    <WrapItem>
                        <StatusComp />
                    </WrapItem>
                </Wrap>
                <TagsComp />
            </React.Fragment>
        );
    }
    React.useEffect(() => {
        appWindow.setTitle("Manga Search | Mangadex");
    }, []);
    useTrackEvent("mangadex-manga-search");
    return (
        <Card>
            <CardHeader>
                <Heading fontFamily={"inherit"}>Advanced Search</Heading>
                <ChakraContainer>
                    <form onSubmit={formik.handleSubmit}>
                        <VStack divider={<StackDivider />}>
                            <FormControl
                                isInvalid={(formik.errors.title ? true : false) && formik.touched.title}
                            >
                                <FormLabel>
                                    <Heading size={"lg"} fontFamily={"inherit"}>
                                        Title
                                    </Heading>
                                </FormLabel>
                                <HStack>
                                    <Input
                                        name={"title"}
                                        onChange={formik.handleChange}
                                        type="search"
                                    />
                                    <IconButton colorScheme="orange" aria-label="Search" type="submit" icon={<SearchIcon />} />
                                    <IconButton background={"gray.200"} _hover={{
                                        background: "gray.400"
                                    }} aria-label="Filter" onClick={onToggle} icon={<RiFilterFill />} />
                                </HStack>
                                <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
                            </FormControl>
                            <Collapse in={isOpen} animateOpacity>
                                <FilterCollapse />
                            </Collapse>
                        </VStack>
                    </form>
                </ChakraContainer>
            </CardHeader>
            <CardBody>
                {
                    result
                }
            </CardBody>
        </Card>
    );
}