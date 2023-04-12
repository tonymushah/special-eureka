import { Box } from "@chakra-ui/react";
import { Mangadex_suspense__ } from "@mangadex";
import { Offset_limits } from "@mangadex/api/internal/Utils";
import { Manga, Manga_with_allRelationship } from "@mangadex/api/structures/Manga";
import MangaSearch_withAllIncludes from "@mangadex/api/structures/SearchType/MangaSearch_withAllIncludes";
import CollectionComponnent_WithQuery from "@mangadex/resources/componnents/Collection/CollectionComponnent_WithQuery";
import { Formik } from "formik";
import React from "react";

const MangaList = React.lazy(() => import("@mangadex/resources/componnents/mangas/v1/MangaList"))

export default function Manga_Search(){
    const [ result, setResult ] = React.useState(<React.Fragment></React.Fragment>)
    return (
        <Box>
            
            <Formik<MangaSearch_withAllIncludes>
                initialValues={{
                    offset_Limits : new Offset_limits().set_limits(10),
                }}
                onSubmit={(values) => {
                    setResult(
                        <CollectionComponnent_WithQuery<Manga>
                            queryKey={["mdx", "manga", "search", `${Math.random() * 100}`]}
                            fn={async () => {
                                return await Manga_with_allRelationship.search(values);
                            }}
                        >
                            {
                                ({ get_data }) => (
                                    <React.Suspense
                                        fallback={<Mangadex_suspense__/>}
                                    >
                                        <MangaList src={get_data()}/>
                                    </React.Suspense>
                                )
                            }
                        </CollectionComponnent_WithQuery>
                    );
                }}
            >
                {
                    (props) => (
                        <></>
                    )
                }
            </Formik>
            {
                result
            }
        </Box>
    )
}