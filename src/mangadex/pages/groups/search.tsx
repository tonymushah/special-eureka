import React from "react";
import { Mangadex_suspense } from "@mangadex/index";
import { Offset_limits } from "@mangadex/api/internal/Utils";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import { useAppWindowTitle } from "@mangadex/resources/hooks/TauriAppWindow";

const Group_Search = React.lazy(() => import("@mangadex/resources/componnents/groups/Group_Search"));

export default function Group_Search_default(){
    const offset_Limits = new Offset_limits();
    offset_Limits.set_limits(25);
    const setTitle = useAppWindowTitle();
    React.useEffect(() => {
        setTitle("Groups | Mangadex");
    }, []);
    return (
        <Mangadex_suspense>
            <ChakraContainer>
                <Group_Search offset_limits={offset_Limits} />
            </ChakraContainer>
        </Mangadex_suspense>
    );
}