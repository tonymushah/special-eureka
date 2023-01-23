import React from "react";
import { Container } from "react-bootstrap";
import { Mangadex_suspense } from "../..";
import { Offset_limits } from "../../api/internal/Utils";

const Group_Search = React.lazy(() => import("../../resources/componnents/groups/Group_Search"))

export default function Group_Search_default(){
    let offset_Limits = new Offset_limits()
    offset_Limits.set_limits(25);
    return (
        <Mangadex_suspense>
            <Container>
                <Group_Search offset_limits={offset_Limits} />
            </Container>
        </Mangadex_suspense>
    )
}