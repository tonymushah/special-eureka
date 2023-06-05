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
import { TagGroupSplitterProvider } from "@mangadex/resources/componnents/tag/TagSplitter";
import { Client } from "@tauri-apps/api/http";
import { appWindow } from "@tauri-apps/api/window";
import { FieldArray, Form, Formik, useFormik } from "formik";
import React from "react";

const MangaList = React.lazy(() => import("@mangadex/resources/componnents/mangas/v1/MangaList"));

enum TagInsertionMode {
    Include,
    Exclude,
    None
}

type TagInsertion = {
    id: string,
    mode: TagInsertionMode
}

type MangaSearchOption = {
    offset_limit: Offset_limits,
    title?: string,
    tags?: TagInsertion[],
    status?: Array<string>,
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

export default function Manga_Search() {
    const client = useHTTPClient();
    const [result, setResult] = React.useState(
        <Manga_Search_Result
            offset_Limits={new Offset_limits()}
            client={client}
        />
    );
    function get_tag_index(array: Array<string>, element_: string): number {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if (element.localeCompare(element_) == 0) {
                return index;
            }
        }
        return -1;
    }
    const formik = useFormik<MangaSearchOption>({
        initialValues: {
            offset_limit: new Offset_limits(),
            client: client
        },
        onSubmit(values, formikHelpers) {
            const excludedTags: string[] = [];
            const includedTags: string[] = [];
            values.tags?.forEach((d) => {
                if (d.mode == TagInsertionMode.Exclude) {
                    excludedTags.push(d.id);
                } else if (d.mode == TagInsertionMode.Include) {
                    includedTags.push(d.id);
                }
            });
            setResult(
                <Manga_Search_Result
                    offset_Limits={new Offset_limits()}
                    client={client}
                    title={values.title}
                    excludedTags={excludedTags}
                    includedTags={includedTags}
                />
            );
        },
    });
    function Tags(){
        return (
            <AllTagConsumer>
                {
                    (d) => (
                        <TagGroupSplitterProvider tags={d}>
                            
                        </TagGroupSplitterProvider>
                    )
                }
            </AllTagConsumer>
        )
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
                <Form onReset={formik.handleReset} onSubmit={formik.handleSubmit}>
                    <FormControl
                        isInvalid={(formik.errors.title ? true : false) && formik.touched.title}
                    >
                        <FormLabel>
                            Title
                        </FormLabel>
                        <Input
                            name={"title"}
                            onChange={formik.handleChange}
                            type="search"
                        />
                        <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
                    </FormControl>
                </Form>
            </Container>
            {
                result
            }
        </Box>
    );
}