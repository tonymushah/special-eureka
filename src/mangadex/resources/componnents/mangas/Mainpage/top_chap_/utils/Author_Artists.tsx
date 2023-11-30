import { Alert, AlertIcon, AlertTitle, Skeleton, Wrap, WrapItem } from "@chakra-ui/react";
import { Author } from "@mangadex/api/structures/Author";
import Manga from "@mangadex/api/structures/Manga";
import { get_manga_page_authors_artists } from "@mangadex/resources/hooks/MangaStateHooks/get_manga_page_authors_artists";
import { AuthorCol } from "../../boutons/author_boutons";

function Authors(props : {
    src : Manga
}){
    const {
        authors, 
        is_Authors_finished
    } = get_manga_page_authors_artists(props);
    if(is_Authors_finished()){
        return (
            <AuthorCol title="Authors" src={authors.map<Author | undefined>((value) => {
                if(value.isSuccess){
                    return value.data;
                }else{
                    return undefined;
                }
            })} />
        );
    }else{
        return (
            <Alert status={"loading"}>
                <AlertIcon/>
                <AlertTitle>
                    Loading
                </AlertTitle>
            </Alert>
        );
    }
}

function Artistists(props : {
    src : Manga
}){
    const {
        artistists, 
        is_Artists_finished
    } = get_manga_page_authors_artists(props);
    if(is_Artists_finished()){
        return (
            <AuthorCol title="Artistists" src={artistists.map<Author | undefined>((value) => {
                if(value.isSuccess){
                    return value.data;
                }else{
                    return undefined;
                }
            })} />
        );
    }else{
        return (
            <Alert status={"loading"}>
                <AlertIcon/>
                <AlertTitle>
                    Loading
                </AlertTitle>
            </Alert>
        );
    }
}

export default function Author_Artists(props: {
    src: Manga
}) {
    const {
        is_Author_artists_finished
    } = get_manga_page_authors_artists(props);
    
    if (!is_Author_artists_finished()) {
        return (
            <Skeleton height={"10"} width={"200px"}/>
        );
    } else {
        return (
            <Wrap>
                <WrapItem>
                    <Authors {...props}/>
                </WrapItem>
                <WrapItem>
                    <Artistists {...props}/>
                </WrapItem>
            </Wrap>
        );
    }
}

