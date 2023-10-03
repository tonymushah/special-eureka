import { useMangaDexPath } from "@mangadex/index";
import React from "react";
import { NavigateOptions, useLocation, useNavigate } from "react-router";
import { useGroupPageContext } from "../../..";

export default function useState(additionalPath? : string){
    const group = useGroupPageContext();
    const mangaDexPath = useMangaDexPath();
    const navigate_ = useNavigate();
    const { pathname } = useLocation();
    const to = React.useMemo(() => `${mangaDexPath}/group/${group.get_id() ?? ""}${additionalPath ? `/${additionalPath}` : ""}`, [mangaDexPath, group, additionalPath]);
    const isOnTo = React.useMemo(() => pathname == to, [to, pathname]);
    const navigate = React.useCallback((options? : NavigateOptions) => navigate_(to, options), [navigate_, to]);
    return {
        to,
        isOnTo,
        navigate
    };
}