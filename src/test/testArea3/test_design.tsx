import React from "react";
import ReactDOM from "react-dom/client";
//import MangaList from "../../mangadex/api/tsx/MangaList";
//import El_Manga_simple2 from "../../mangadex/api/tsx/Manga2";
import * as Chakra from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.css";
import "flag-icons/css/flag-icons.min.css";
import "font-awesome/css/font-awesome.css";
import {

    QueryClient,

    QueryClientProvider
} from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Group_WithAllRelationShip } from "../../mangadex/api/structures/Group";

import { Offset_limits } from "../../mangadex/api/internal/Utils";
import test_group from "./test_groups/ab24085f-b16c-4029-8c05-38fe16592a85_all_includes.json";
import TryCatch from "../../commons-res/components/TryCatch";
import test_author from "./test_author/4f1d23a5-02d9-419d-88f3-0a17a5ccc821.json";
import { Author } from "../../mangadex/api/structures/Author";
import waveHaikei from "./imgs/wave-haikei-1.svg";
import { Container } from "react-bootstrap";
const Group_Search = React.lazy(() => import("../../mangadex/resources/componnents/groups/Group_Search"));

const ExtLink = React.lazy(async () => {
    let res = await import("../../commons-res/components/ExtLink");
    return {
        default: res.ExtLink
    };
})
const ReactMarkDown = React.lazy(() => import("react-markdown"));

const queryClient = new QueryClient();
//const test_area = ReactDOM.createRoot(document.getElementById("test_area")!);

const yukino = Author.build_wANY(test_author.data);

function Author_Page(props: {
    src: Author
}) {
    return (
        <Chakra.Box>
            <Chakra.Box
                width={"100%"}
                backgroundPosition={"bottom"}
                backgroundImage={waveHaikei}
                backgroundRepeat={"no-repeat"}
                backgroundSize={"cover"}
            >
                <Chakra.Heading paddingTop={"5em"} marginLeft={"2em"} size={"2xl"}>{props.src.get_Name()}</Chakra.Heading>
            </Chakra.Box>
            <Chakra.Box
                backgroundColor={"#e2e8f0"}
            >
                <Chakra.Box paddingTop={"25px"} as={Container}>
                    <Chakra.Box>
                        <Chakra.Heading size={"md"}>
                            Biography
                        </Chakra.Heading>
                        <Chakra.Box
                        >
                            {
                                props.src.get_biography() == undefined ? (
                                    <Chakra.Text as='i'>No Biography</Chakra.Text>
                                ) : (
                                    <React.Suspense>
                                        <ReactMarkDown
                                            children={props.src.get_biography()}
                                            components={{
                                                a(node, href, ...props) {
                                                    return (
                                                        <React.Suspense
                                                            fallback={<Chakra.Skeleton width={"10px"} height={"10px"} />}
                                                        >
                                                            {
                                                                node.href == undefined ? (
                                                                    <Chakra.Link>{node.children}</Chakra.Link>
                                                                ) : (
                                                                    <React.Suspense
                                                                        fallback={
                                                                            <Chakra.Skeleton width={"10px"} height={"10px"} />
                                                                        }
                                                                    >
                                                                        <ExtLink href={node.href}>
                                                                            <Chakra.Link>{node.children}</Chakra.Link>
                                                                        </ExtLink>
                                                                    </React.Suspense>
                                                                )
                                                            }
                                                        </React.Suspense>
                                                    )
                                                }
                                            }}
                                        />
                                    </React.Suspense>
                                )
                            }

                        </Chakra.Box>
                    </Chakra.Box>
                </Chakra.Box>
            </Chakra.Box>
        </Chakra.Box>
    )
}

ReactDOM.hydrateRoot(document.getElementById("test_area")!, (
    <Chakra.ChakraProvider >
        <QueryClientProvider
            client={queryClient}
        >
            <ReactQueryDevtools
                initialIsOpen={false}
            />
            <Chakra.Box
                margin={10}
            >
                {/* <TryCatch
                    catch={(error) => (
                        <Chakra.Alert>
                            <Chakra.AlertIcon />
                            <Chakra.AlertTitle>{error.message}</Chakra.AlertTitle>
                            <Chakra.AlertDescription>{error.stack}</Chakra.AlertDescription>
                        </Chakra.Alert>
                    )}
                >
                    <AllDownlaodedMangaConsumer>
                        {
                            (value: Array<string>) => (
                                <MangaListByArrayMangaID src={value} />
                            )
                        }
                    </AllDownlaodedMangaConsumer>
                </TryCatch>

                   
                    <MangaElementDef2_withID mangaID={to_use_manga} />
                    */}

                <TryCatch
                    catch={(error) => (
                        <Chakra.Alert>
                            <Chakra.AlertIcon />
                            <Chakra.AlertTitle>
                                {
                                    error.name
                                }
                            </Chakra.AlertTitle>
                            <Chakra.AlertDescription>
                                {
                                    error.message
                                }
                            </Chakra.AlertDescription>
                        </Chakra.Alert>
                    )}
                >
                    <Author_Page
                        src={yukino}
                    />
                </TryCatch>
            </Chakra.Box>
        </QueryClientProvider>
    </Chakra.ChakraProvider>
))

/*test_area.render(

);*/
/**/