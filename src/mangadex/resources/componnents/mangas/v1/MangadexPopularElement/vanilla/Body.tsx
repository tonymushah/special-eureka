import { CardBody } from "@chakra-ui/react";
import React from "react";

import TitleFallback from "../../MangaPopularElementFallback/Body/Title";
import TagsFallback from "../../MangaPopularElementFallback/Body/Tags";
import DescriptionFallback from "../../MangaPopularElementFallback/Body/Description";
import AuthorArtistsFallback from "../../MangaPopularElementFallback/Body/AuthorArtists";

const Title = React.lazy(() => import("./Title"));

const Tags = React.lazy(() => import("./Tags"));

const Description = React.lazy(() => import("./Description"));

const AuthorArtists = React.lazy(() => import("./AuthorArtists"));

export default function Body() {
    return (
        <CardBody>
            <React.Suspense fallback={<TitleFallback />}>
                <Title />
            </React.Suspense>
            <React.Suspense fallback={<TagsFallback />}>
                <Tags />
            </React.Suspense>
            <React.Suspense fallback={<DescriptionFallback />}>
                <Description />
            </React.Suspense>
            <React.Suspense fallback={<AuthorArtistsFallback />}>
                <AuthorArtists />
            </React.Suspense>
        </CardBody>
    );
}