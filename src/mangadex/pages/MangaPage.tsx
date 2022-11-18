import React from "react";
import { Link, Outlet, useOutletContext, useLoaderData } from "react-router-dom";
import * as Chakra from "@chakra-ui/react"
import { Manga } from "../api/structures/Manga";
import { Manga_Page } from "../resources/componnents/mangas/Manga_Page";
import { Nav, Container } from "react-bootstrap";
import { Top_Chaps } from "../resources/componnents/mangas/Mainpage/Top_chap";
import { Covers_Manga } from "../resources/componnents/mangas/Mainpage/Covers_";
import Related from "../resources/componnents/mangas/Mainpage/Related";

type MangaPage_OutletContex = {
    toUse : Manga
}

function MangaPage(){
    //let { id } = useParams();
    let { loader1 } = useLoaderData();
    let mangaToUse : Manga = loader1;
    return (
            
                        <Manga_Page
                            src={mangaToUse}
                        >
                            <Chakra.Box>
                                <Container>
                                    <Nav
                                        variant="tabs"
                                        as={Chakra.Box}
                                    >
                                        <Nav.Item>
                                            <Nav.Link 
                                                as={Link} 
                                                to="."
                                                eventKey="chapters"
                                            >
                                                Chapters
                                            </Nav.Link>
                                            
                                            
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link 
                                                as={Link} 
                                                to="covers"
                                                eventKey="covers"
                                            >
                                                Covers
                                            </Nav.Link>
                                        </Nav.Item>
                                        {
                                            mangaToUse.get_some_relationshipLength("manga") == 0 ? (<></>) : (
                                                <Nav.Item>
                                                    <Nav.Link
                                                        as={Link}
                                                        to="related"
                                                        eventKey="related"
                                                    >
                                                        Related
                                                    </Nav.Link>
                                                </Nav.Item>
                                            )
                                        }
                                    </Nav>
                                </Container>
                            </Chakra.Box>
                            <Chakra.Box>
                                <Container>
                                    <Outlet context={{ toUse : mangaToUse}}/>
                                </Container>
                            </Chakra.Box>
                        </Manga_Page>
    )
}
/*
<React.Suspense
            fallback={
                <Chakra.Box
                    display={"block"}
                >
                    <Chakra.AbsoluteCenter>
                        <Chakra.Spinner 
                            size="xl"
                            color='orange.500'
                            thickness='4px'
                        />
                    </Chakra.AbsoluteCenter>
                </Chakra.Box>
            }
        >
            <Await
                resolve={Manga.getMangaByID(id!)}
                errorElement={
                    <ErrorELAsync></ErrorELAsync>
                }
            >
                {(getted : Manga) => {
                    return (
                        <Manga_Page
                            src={getted}
                        >
                            <Nav
                                variant="tabs"
                            >
                                <Nav.Item>
                                    <Nav.Link 
                                        as={Link} 
                                        to="."
                                        eventKey="chapters"
                                    >
                                        Chapters
                                    </Nav.Link>
                                    <Nav.Link 
                                        as={Link} 
                                        to="covers"
                                        eventKey="covers"
                                    >
                                        Covers
                                    </Nav.Link>
                                    {
                                        getted.get_some_relationshipLength("manga") != 0 ? (<></>) : (<Nav.Link
                                            as={Link}
                                            to="related"
                                            eventKey="related"
                                        ></Nav.Link>)
                                    }
                                </Nav.Item>
                            </Nav>
                            <Chakra.Box>
                                <Outlet context={{ toUse : getted}}/>
                            </Chakra.Box>
                        </Manga_Page>
                    )
                }}
            </Await>
        </React.Suspense>
*/
function useManga(){
    return useOutletContext<MangaPage_OutletContex>();
}

export function Chapters_(){
    let toUse : Manga = useManga().toUse;
    return (
        <Top_Chaps src={toUse}></Top_Chaps>
    )
}

export function Covers_(){
    let toUse : Manga = useManga().toUse;
    return (
        <Covers_Manga src={toUse}></Covers_Manga>
    )
}

export function Related_(){
    let toUse : Manga = useManga().toUse;
    return (
        <Related src={toUse}/>
    )
}

export default MangaPage