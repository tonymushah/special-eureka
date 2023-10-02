import { useMangaDexPath } from "@mangadex/index";
import React from "react";
import { NavigateOptions, useLocation, useNavigate, useParams } from "react-router";
export default function useState(additionalPath? : string){
    const { id } = useParams();
    const mangaDexPath = useMangaDexPath();
    const navigate_ = useNavigate();
    const { pathname } = useLocation();
    const to = React.useMemo(() => `${mangaDexPath}/manga/${id ?? ""}${additionalPath ? `/${additionalPath}` : ""}`, [mangaDexPath, id, additionalPath]);
    const isOnTo = React.useMemo(() => pathname == to, [to, pathname]);
    const navigate = React.useCallback((options? : NavigateOptions) => navigate_(to, options), [navigate_, to]);
    return {
        to,
        isOnTo,
        navigate
    };
}