import React from "react";
import { Placeholder, Row } from "react-bootstrap";
import { Author } from "../../../../../api/structures/Author";
import { Manga } from "../../../../../api/structures/Manga";
import { get_manga_page_authors_artists } from "../../../../hooks/MangaStateHooks";
import { AuthorCol } from "../boutons/author_boutons";

export default function Author_Artists(props: {
    src: Manga
}) {
    const {
        authors, 
        artistists,
        is_Artists_finished,
        is_Authors_finished
    } = get_manga_page_authors_artists(props);
    
    if (is_Artists_finished() == false && is_Authors_finished() == false) {
        return (
            <Placeholder lg={10}></Placeholder>
        );
    } else {
        return (
            <Row>
                <>

                    <AuthorCol title="Authors" src={authors.map<Author>((value) => {
                        return value.data!;
                    })} />

                </>
                <>
                    <AuthorCol title="Artistists" src={artistists.map<Author>((value) => {
                        return value.data!;
                    })} />
                </>
            </Row>
        );
    }
}

