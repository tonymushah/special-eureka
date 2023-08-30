import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Offset_limits } from "@mangadex/api/internal/Utils";
import { Collection } from "@mangadex/api/structures/Collection";
import { Group } from "@mangadex/api/structures/Group";
import { trackEvent } from "@mangadex/index";
import { useFormik } from "formik";
import React from "react";
import MangadexSpinner from "../../kuru_kuru/MangadexSpinner";
import GroupFallBackElement from "../GroupFallBackElement";

export const Group_Simple_Element = React.lazy(() => import("../Group_Simple_Element"));
export const CollectionComponnent_WithQuery = React.lazy(async () => {
    const res = await import("../../Collection/Collection");
    const d = res.CollectionComponnent_WithQuery<Group>;
    return {
        default: d
    };
});


export function useState(props: {
    offset_limits: Offset_limits;
}) {
    const [result, setResult] = React.useState(<React.Fragment />);
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
                <React.Suspense fallback={<Chakra.Box>
                    <Chakra.Center>
                        <MangadexSpinner />
                    </Chakra.Center>
                </Chakra.Box>}>
                    <CollectionComponnent_WithQuery
                        fn={() => {
                            return Group.search({
                                offset_Limits: props.offset_limits,
                                name: values.name,
                                client: client
                            });
                        }}
                        // [x] Refactor into a function
                        queryKey={queryKey(random)}
                    >
                        {(value: Collection<Group>) => (
                            <Chakra.Wrap>
                                {value.get_data().map((group) => (
                                    <Chakra.WrapItem key={group.get_id()}>
                                        <React.Suspense
                                            fallback={<GroupFallBackElement />}
                                        >
                                            {group instanceof Group ? (
                                                <Group_Simple_Element src={group} />
                                            ) : (
                                                <React.Fragment/>
                                            )}
                                        </React.Suspense>
                                    </Chakra.WrapItem>
                                ))}
                            </Chakra.Wrap>
                        )}
                    </CollectionComponnent_WithQuery>
                </React.Suspense>
            );
        },
        validate(values) {
            const error: {
                name?: string;
            } = {};
            if (values.name === "") {
                error.name = "Invalid name";
            }
            return error;
        }
    });
    return {
        result,
        client,
        formik
    };
}

export function queryKey(random: number) {
    return ["mdx", "group", "search", random];
}

