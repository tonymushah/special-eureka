import * as Chakra from "@chakra-ui/react";
import { useNavigate, useParams } from "@router";
import React from "react";
import { useLocation } from "react-router";

export default function ChaptersButton() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams("/mangadex/manga/:id");
    const isOnTo = React.useMemo(() => location.pathname == `/mangadex/manga/${id}/related` || location.pathname == `/mangadex/manga/${id}/related/`, [location, id]);
    return (
        <Chakra.Button variant={isOnTo ? "solid" : "outline"} onClick={(e) => {
            e.preventDefault();
            navigate("/mangadex/manga/:id/related", {
                params: {
                    id
                },
                preventScrollReset: true
            });
        }} >
            Related
        </Chakra.Button>
    );
}