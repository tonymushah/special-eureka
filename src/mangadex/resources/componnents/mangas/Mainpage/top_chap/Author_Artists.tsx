import { Skeleton, Wrap, WrapItem } from "@chakra-ui/react";
import { Author } from "@mangadex/api/structures/Author";
import { Manga } from "@mangadex/api/structures/Manga";
import { get_manga_page_authors_artists } from "@mangadex/resources/hooks/MangaStateHooks";
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
            <Skeleton height={"10"} width={"200px"}/>
        );
    } else {
        return (
            <Wrap>
                <WrapItem>

                    <AuthorCol title="Authors" src={authors.map<Author>((value) => {
                        return value.data!;
                    })} />

                </WrapItem>
                <WrapItem>
                    <AuthorCol title="Artistists" src={artistists.map<Author>((value) => {
                        return value.data!;
                    })} />
                </WrapItem>
            </Wrap>
        );
    }
}

