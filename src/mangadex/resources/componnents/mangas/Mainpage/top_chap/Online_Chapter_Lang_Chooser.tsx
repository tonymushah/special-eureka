import * as Chakra from '@chakra-ui/react';
import "flag-icons/css/flag-icons.min.css";
import React from "react";
import { Spinner } from "react-bootstrap";
import { useQuery } from "react-query";
import { Languages } from "@mangadex/api/internal/Utils";
import ErrorEL1 from "../../../error/ErrorEL1";
import Flag_icons from '../../../FlagIcons';
import { MangaPageProps } from "../../Manga_Page";

const Manga_Page_Aggregate = React.lazy(() => import("./Manga_Page_Aggregate"));

export default function Online_Chapter_Lang_Chooser(props: MangaPageProps) {
    const [to_see_lang, setTo_see_lang] = React.useState<string | undefined>(undefined);
    const query = useQuery<Languages, Error>("mdx-lang", () => {
        return Languages.initialize()
    }, {
        staleTime: Infinity
    })
    if (query.isLoading == true && query.isRefetching) {
        return (
            <Chakra.Box m={2} bg="inherit">
                <div className=" text-center">
                    <Spinner
                        animation="border"
                    ></Spinner>
                    <br />
                    <p>Loading chapters ...</p>
                </div>
            </Chakra.Box>
        )
    }
    if (query.isError) {
        return (
            <ErrorEL1
                error={query.error}
            />
        )
    }
    if (query.isSuccess) {
        return (
            <Chakra.Box>
                <Chakra.HStack>
                    <Chakra.Text>Language</Chakra.Text>
                    <Chakra.Menu>
                        <Chakra.MenuButton>
                            <Chakra.Button>{
                                to_see_lang == undefined ? "All" : (
                                    <>
                                        <Flag_icons locale={query.data.getLang_byTwo_letter(to_see_lang).get_flag_icon()}/>
                                        {
                                            query.data.getLang_byTwo_letter(to_see_lang).get_name()
                                        }
                                    </>
                                )
                            }
                            </Chakra.Button>
                        </Chakra.MenuButton>
                        <Chakra.MenuList>
                            {
                                props.src.get_avaible_language().map((value) => (
                                    <>
                                        {
                                            value != null || value != undefined ? (
                                                <Chakra.MenuItem
                                                    onClick={() => setTo_see_lang(value)}
                                                >{
                                                        <>
                                                            <Flag_icons locale={query.data.getLang_byTwo_letter(value).get_flag_icon()}/>
                                                            {
                                                                query.data.getLang_byTwo_letter(value).get_name()
                                                            }
                                                        </>
                                                    }</Chakra.MenuItem>
                                            ) : (<></>)
                                        }
                                    </>

                                ))
                            }
                        </Chakra.MenuList>
                    </Chakra.Menu>
                </Chakra.HStack>
                <Chakra.Box>
                    <React.Suspense
                        fallback={
                            <Chakra.Box m={2} bg="inherit">
                                <div className=" text-center">
                                    <Spinner
                                        animation="border"
                                    ></Spinner>
                                    <br />
                                    <p>Loading chapters ...</p>
                                </div>
                            </Chakra.Box>
                        }
                    >
                        <Manga_Page_Aggregate
                            src={props.src}
                            to_see_lang={to_see_lang == undefined ? undefined : [to_see_lang]}
                        />
                    </React.Suspense>
                </Chakra.Box>
            </Chakra.Box>
        )
    }
    return (
        <Chakra.Box m={2} bg="inherit">
            <div className=" text-center">
                <Spinner
                    animation="border"
                ></Spinner>
                <br />
                <p>Loading chapters ...</p>
            </div>
        </Chakra.Box>
    )
}
