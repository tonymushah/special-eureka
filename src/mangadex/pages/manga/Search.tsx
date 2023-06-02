import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Container, FormControl, FormErrorMessage, FormLabel, HStack, Heading, Input, Tag, TagLabel, TagLeftIcon, Wrap, WrapItem, Switch, CheckboxGroup, Select, RadioGroup, Radio } from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Mangadex_suspense__, trackEvent, useTrackEvent } from "@mangadex";
import { And_Or, Offset_limits } from "@mangadex/api/internal/Utils";
import { Manga, Manga_with_allRelationship } from "@mangadex/api/structures/Manga";
import MangaSearch_withAllIncludes from "@mangadex/api/structures/SearchType/MangaSearch_withAllIncludes";
import CollectionComponnent_WithQuery from "@mangadex/resources/componnents/Collection/CollectionComponnent_WithQuery";
import MyErrorBounderies from "@mangadex/resources/componnents/error/MyErrorBounderies";
import AllTagConsumer from "@mangadex/resources/componnents/tag/AllTagConsumer";
import { appWindow } from "@tauri-apps/api/window";
import { FieldArray, Form, Formik } from "formik";
import React from "react";

const MangaList = React.lazy(() => import("@mangadex/resources/componnents/mangas/v1/MangaList"));

export default function Manga_Search() {
    const client = useHTTPClient();
    const [result, setResult] = React.useState(
        <MyErrorBounderies>
            <CollectionComponnent_WithQuery<Manga>
                queryKey={["mdx", "manga", "search", `${Math.random() * 100}`]}
                fn={async () => {
                    return await Manga_with_allRelationship.search({
                        offset_Limits: new Offset_limits(),
                        client
                    });
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
    function get_tag_index(array : Array<string>, element_ : string) : number {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if(element.localeCompare(element_) == 0){
                return index;
            }
        }
        return -1;
    }
    React.useEffect(() => {
        appWindow.setTitle("Manga Search | Mangadex");
    }, []);
    useTrackEvent("mangadex-manga-search");
    return (
        <Box>
            <Container maxW={{
                sm: "container.sm",
                md: "container.md",
                lg: "container.lg",
                xl: "container.xl"
            }}>
                <Heading fontFamily={"inherit"}>Manga Search</Heading>
                <Formik<MangaSearch_withAllIncludes>
                    initialValues={{
                        offset_Limits: new Offset_limits().set_limits(10),
                        client
                    }}
                    onSubmit={(values) => {
                        const { includedTags, excludedTags } = values;
                        const ex : {
                            [key : string] : string
                        } = {};
                        const in_ : {
                            [key : string] : string
                        } = {};
                        excludedTags?.forEach((d, i) => {
                            ex[`ex-${i}`] = d;
                        });
                        includedTags?.forEach((d, i) => {
                            in_[`in-${i}`] = d;
                        });
                        trackEvent("mangadex-search-input", {
                            ...ex,
                            ...in_
                        });
                        setResult(
                            <MyErrorBounderies>
                                <CollectionComponnent_WithQuery<Manga>
                                    queryKey={["mdx", "manga", "search", `${Math.random() * 100}`]}
                                    fn={async () => {
                                        return await Manga_with_allRelationship.search(values);
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
                    }}
                >
                    {
                        (props_) => (
                            <Form onReset={props_.handleReset} onSubmit={props_.handleSubmit}>
                                <FormControl
                                    isInvalid={(props_.errors.title ? true : false) && props_.touched.title}
                                >
                                    <FormLabel>
                                        Title
                                    </FormLabel>
                                    <Input
                                        name={"title"}
                                        onChange={props_.handleChange}
                                        type="search"
                                    />
                                    <FormErrorMessage>{props_.errors.title}</FormErrorMessage>
                                </FormControl>
                                <Box>
                                    <FormControl
                                        isInvalid={(props_.errors.includedTags ? true : false) && props_.touched.includedTags}
                                    >
                                        <FormLabel>
                                            Included Tags
                                        </FormLabel>
                                        <FieldArray
                                            name="includedTags"
                                        >
                                            {arrayhelper => (
                                                <React.Fragment>
                                                    <AllTagConsumer>
                                                        {(tags) => (
                                                            <Wrap>
                                                                {
                                                                    tags.map((tag) => (
                                                                        <WrapItem key={tag.get_id()} >
                                                                            <Tag 
                                                                                colorScheme={props_.values.includedTags?.includes(tag.get_id()) ? "orange" : "gray"}
                                                                                onClick={() => {
                                                                                    if(props_.values.includedTags?.includes(tag.get_id())){
                                                                                        arrayhelper.remove(get_tag_index(props_.values.includedTags, tag.get_id()));
                                                                                    }else{
                                                                                        arrayhelper.push(tag.get_id());
                                                                                    }
                                                                                }}
                                                                            >
                                                                                {
                                                                                    props_.values.includedTags?.includes(tag.get_id()) ? (
                                                                                        <TagLeftIcon as={MinusIcon}/>
                                                                                    ) : (
                                                                                        <TagLeftIcon as={AddIcon}/>
                                                                                    )
                                                                                }
                                                                                <TagLabel>{tag.get_name().en}</TagLabel>
                                                                            </Tag>
                                                                        </WrapItem>
                                                                    ))
                                                                }
                                                            </Wrap>
                                                        )}
                                                    </AllTagConsumer>
                                                </React.Fragment>
                                            )}
                                        </FieldArray>
                                    </FormControl>
                                    <FormControl>
                                        <HStack>
                                            <FormLabel>
                                                Included Tags Mode
                                            </FormLabel>
                                            <Tag></Tag>
                                        </HStack>
                                        <RadioGroup name="includedTagsMode">
                                            <HStack>
                                                <Radio value={And_Or.and()}>And</Radio>
                                                <Radio value={And_Or.or()}>Or</Radio>
                                            </HStack>
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl
                                        isInvalid={(props_.errors.excludedTags ? true : false) && props_.touched.excludedTags}
                                    >
                                        <FormLabel>
                                            Excluded Tags
                                        </FormLabel>
                                        <FieldArray
                                            name="excludedTags"
                                        >
                                            {arrayhelper => (
                                                <React.Fragment>
                                                    <AllTagConsumer>
                                                        {(tags) => (
                                                            <Wrap>
                                                                {
                                                                    tags.map((tag) => (
                                                                        <WrapItem key={tag.get_id()} >
                                                                            <Tag 
                                                                                colorScheme={props_.values.excludedTags?.includes(tag.get_id()) ? "orange" : "gray"}
                                                                                onClick={() => {
                                                                                    if(props_.values.excludedTags?.includes(tag.get_id())){
                                                                                        arrayhelper.remove(get_tag_index(props_.values.excludedTags, tag.get_id()));
                                                                                    }else{
                                                                                        arrayhelper.push(tag.get_id());
                                                                                    }
                                                                                }}
                                                                            >
                                                                                {
                                                                                    props_.values.excludedTags?.includes(tag.get_id()) ? (
                                                                                        <TagLeftIcon as={MinusIcon}/>
                                                                                    ) : (
                                                                                        <TagLeftIcon as={AddIcon}/>
                                                                                    )
                                                                                }
                                                                                <TagLabel>{tag.get_name().en}</TagLabel>
                                                                            </Tag>
                                                                        </WrapItem>
                                                                    ))
                                                                }
                                                            </Wrap>
                                                        )}
                                                    </AllTagConsumer>
                                                </React.Fragment>
                                            )}
                                        </FieldArray>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>
                                            Excluded Tags Mode
                                        </FormLabel>
                                        <RadioGroup name="excludedTagsMode">
                                            <HStack>
                                                <Radio value={And_Or.and()}>And</Radio>
                                                <Radio value={And_Or.or()}>Or</Radio>
                                            </HStack>
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                            </Form>
                        )
                    }
                </Formik>
            </Container>
            {
                result
            }
        </Box>
    );
}