/*eslint-env broswer*/
import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Offset_limits } from "@mangadex/api/internal/Utils";
import { Collection } from "@mangadex/api/structures/Collection";
import { Group } from "@mangadex/api/structures/Group";
import { trackEvent } from "@mangadex/index";
import { useFormik } from "formik";
import React from "react";
import MangadexSpinner from "../kuru_kuru/MangadexSpinner";
import GroupFallBackElement from "./GroupFallBackElement";

const Group_Simple_Element = React.lazy(() => import("./Group_Simple_Element"));
const CollectionComponnent_WithQuery = React.lazy(async () => {
    const res = await import("../Collection/Collection");
    const d = res.CollectionComponnent_WithQuery<Group>;
    return {
        default: d
    };
});

export default function Group_Search(props: {
    offset_limits: Offset_limits
}) {
    const [result, setResult] = React.useState(<React.Fragment/>);
    React.useEffect(() => {
        trackEvent("mangadex-group-search");
    }, []);
    const client = useHTTPClient();
    const formik = useFormik({
        initialValues: {
            name: ""
        },
        onSubmit(values) {
            const random = Math.random() * 100;
            setResult(
                <React.Suspense fallback={
                    <Chakra.Box>
                        <Chakra.Center>
                            <MangadexSpinner />
                        </Chakra.Center>
                    </Chakra.Box>
                }>
                    <CollectionComponnent_WithQuery
                        fn={() => {
                            return Group.search({
                                offset_Limits: props.offset_limits,
                                name: values.name,
                                client: client
                            });
                        }}
                        // [ ] Refactor into a function
                        queryKey={["mdx", "group", "search", random]}
                        query_options={{
                            onSuccess(data){
                                const to_use : Record<string, string> = {};
                                data.get_data().forEach((d, i) => {
                                    to_use[`i-${i}`] = d.get_id();
                                });
                                trackEvent("mangadex-search-result", {
                                    ...to_use
                                });
                            }
                        }}
                    >
                        {
                            (value: Collection<Group>) => (
                                <Chakra.Wrap>
                                    {
                                        value.get_data().map((group) => (
                                            <Chakra.WrapItem key={group.get_id()}>
                                                <React.Suspense
                                                    fallback={
                                                        <GroupFallBackElement />
                                                    }
                                                >
                                                    {
                                                        group instanceof Group ? (
                                                            <Group_Simple_Element src={group} />
                                                        ) : (
                                                            <></>
                                                        )
                                                    }
                                                </React.Suspense>
                                            </Chakra.WrapItem>
                                        ))
                                    }
                                </Chakra.Wrap>
                            )
                        }
                    </CollectionComponnent_WithQuery>
                </React.Suspense>
            );
        },
        validate(values) {
            const error: {
                name?: string
            } = {};
            if (values.name === "") {
                error.name = "Invalid name";
            }
            return error;
        }
    });
    return (
        <Chakra.Stack>
            <Chakra.Heading fontFamily={"inherit"}>Search Group</Chakra.Heading>
            <form
                onSubmit={formik.handleSubmit}
            >
                <Chakra.FormControl isInvalid={formik.errors.name != undefined ? true : false}>
                    <Chakra.FormLabel>
                        Group name
                    </Chakra.FormLabel>
                    <Chakra.Input
                        type={"search"}
                        name={"name"}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {
                        formik.errors.name != undefined ? (
                            <Chakra.FormErrorMessage>
                                {
                                    formik.errors.name
                                }
                            </Chakra.FormErrorMessage>
                        ) : (
                            <></>
                        )
                    }
                </Chakra.FormControl>
            </form>
            <Chakra.Box>
                {
                    result
                }
            </Chakra.Box>
        </Chakra.Stack>

    );
}