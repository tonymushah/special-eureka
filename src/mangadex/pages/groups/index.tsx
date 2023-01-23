import React from "react";
import * as Chakra from "@chakra-ui/react"
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { Group } from "../../api/structures/Group";

const Group_Page = React.lazy(() => import("../../resources/componnents/groups/Group_Page"));

function Group_Page_Suspense(props : React.PropsWithChildren){
    return (
        <React.Suspense
            fallback={
                <Chakra.AbsoluteCenter>
                    <Chakra.Box>
                        <Chakra.Spinner
                            size={"lg"}
                        />
                    </Chakra.Box>
                </Chakra.AbsoluteCenter>
            }
        >
            {
                props.children
            }
        </React.Suspense>
    )
}

export default function Group_Page_(){
    const { id } = useParams();
    if(id != undefined){
        const queryClient = useQueryClient();
        const query_key = "mdx-group-" + id;
        const query = useQuery<Group, Error>(query_key, () => {
            return Group.get_groupById(id);
        }, {
            staleTime : Infinity
        })
        if(query.isLoading || query.isRefetching){
            return (
                <Chakra.AbsoluteCenter>
                    <Chakra.Box>
                        <Chakra.Spinner
                            size={"lg"}
                        />
                    </Chakra.Box>
                </Chakra.AbsoluteCenter>
            )
        }
        if(query.isSuccess){
            return (
                <Group_Page_Suspense>
                    <Group_Page src={query.data}/>
                </Group_Page_Suspense>
            )
        }
        return (
            <Chakra.AbsoluteCenter>
                    <Chakra.Box>
                        <Chakra.Spinner
                            size={"lg"}
                        />
                    </Chakra.Box>
                </Chakra.AbsoluteCenter>
        );
    }else{
        return (
            <Chakra.Alert status="error">
                <Chakra.AlertIcon/>
                <Chakra.AlertTitle>
                    The group id is null
                </Chakra.AlertTitle>
            </Chakra.Alert>
        )
    }
}