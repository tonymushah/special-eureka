import { Box, FormControl, FormErrorMessage, FormLabel, Heading, Input, Wrap, WrapItem } from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Offset_limits } from "@mangadex/api/internal/Utils";
import { Author } from "@mangadex/api/structures/Author";
import AuthorSearchType from "@mangadex/api/structures/SearchType/Author";
import CollectionComponnent_WithQuery from "@mangadex/resources/componnents/Collection/CollectionComponnent_WithQuery";
import AuthorElement from "@mangadex/resources/componnents/authors/AuthorElement";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import { Form, Formik } from "formik";
import React from "react";

export default function Author_Search() {
    const client = useHTTPClient();
    const [result, setResult] = React.useState(<></>);
    return (
        <ChakraContainer>
            <Heading fontFamily={"inherit"}>Author search</Heading>
            <Formik<AuthorSearchType>
                initialValues={{
                    offset_Limits: new Offset_limits(),
                    client: client
                }}
                onSubmit={(v) => {
                    setResult(
                        <CollectionComponnent_WithQuery<Author>
                            queryKey={["mdx", "author", "search", Math.random() * 100]}
                            fn={() => {
                                return Author.searchAuthor(v);
                            }}
                        >
                            {(getted) => (
                                <Wrap>
                                    {getted.get_data().map((author) => (
                                        <WrapItem
                                            key={author.get_id()}
                                        >
                                            <AuthorElement author={author}/>
                                        </WrapItem>
                                    ))}
                                </Wrap>
                            )}
                        </CollectionComponnent_WithQuery>
                    );
                }}
            >
                {props_ => (
                    <Form {...props_}>
                        <FormControl
                            isInvalid={props_.errors.name == undefined ? false : true}
                        >
                            <FormLabel>Name</FormLabel>
                            <Input
                                name={"name"}
                                onChange={props_.handleChange}
                                type={"search"}
                            />
                            <FormErrorMessage>
                                {props_.errors.name ?? ""}
                            </FormErrorMessage>
                        </FormControl>
                    </Form>
                )}
            </Formik>
            <Box>
                {
                    result
                }
            </Box>
        </ChakraContainer>
    );
}