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

    QueryClientProvider,
    useQuery
} from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Group_WithAllRelationShip } from "../../mangadex/api/structures/Group";

import { Lang_and_Data, Offset_limits } from "../../mangadex/api/internal/Utils";
import test_group from "./test_groups/ab24085f-b16c-4029-8c05-38fe16592a85_all_includes.json";
import TryCatch from "../../commons-res/components/TryCatch";
import test_author from "./test_author/4f1d23a5-02d9-419d-88f3-0a17a5ccc821.json";
import { Author } from "../../mangadex/api/structures/Author";
import waveHaikei from "./imgs/wave-haikei-1.svg";
import { Container } from "react-bootstrap";
import { LAD_Tabs } from "../../mangadex/resources/componnents/mangas/Mainpage/tabs/Lang_data_tabs";
import { FaTwitter, FaYoutube } from "react-icons/fa";
import pixiv_logo from "./authors_brands_logo/pixiv-seeklogo.com.svg";
import melonBooks_logo from "./authors_brands_logo/Melonbooks_logo.svg";
import fanbox_logo from "./authors_brands_logo/fanbox.ico";
import booth_logo from "./authors_brands_logo/booth.ico";
import nicoVideo_logo from "./authors_brands_logo/nicoVideo_logo.jpg";
import skeb_logo from "./authors_brands_logo/skeb_logo.svg";
import fantia_logo from "./authors_brands_logo/fantia_logo.svg";
import tumblr_logo from "./authors_brands_logo/tumblr_logo.svg";
import weibo_logo from "./authors_brands_logo/weibo_logo.ico";
import naver_logo from "./authors_brands_logo/naver_logo.ico"
import { Manga } from "../../mangadex/api/structures/Manga";
import { get_author_works, get_author_works_promise, get_author_works_query_key_byAuthor_ID } from "../../mangadex/resources/hooks/AuthorState";
import ErrorEL1 from "../../mangadex/resources/componnents/error/ErrorEL1";
import { CollectionComponnent_WithQuery } from "../../mangadex/resources/componnents/Collection/Collection";
import { Collection } from "../../mangadex/api/structures/Collection";
import MangaList from "../../mangadex/resources/componnents/mangas/v1/MangaList";
import IsPingable from "../../mangadex/resources/componnents/IsPingable";
import { useHTTPClient } from "../../commons-res/components/HTTPClientProvider";
import IsPingable_defaultError from "../../mangadex/resources/componnents/IsPingable_defaultError";
import { getClient } from "@tauri-apps/api/http";
import HTTPClientProvider_Query from "../../commons-res/components/HTTPClientProvider_Query"


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

const HTTPClient = getClient();

function Author_Page_Biography(props: {
    src: Author
}) {
    const query_key = "mdx-author:" + props.src.get_id() + "-biography";
    const query = useQuery<Array<Lang_and_Data>>(query_key, () => {
        return Lang_and_Data.initializeByDesc(props.src.get_biography())
    })
    if (query.isSuccess) {
        if (query.data.length == 0) {
            return (
                <Chakra.Text as={'i'}>No biography</Chakra.Text>
            )
        } else {
            return (
                <LAD_Tabs
                    src={query.data}
                />
            )
        }
    }
    return (
        <Chakra.Text>
            Loading biography
        </Chakra.Text>
    )
}
function Author_Page_Socials(props: {
    src: Author
}) {
    return (
        <Chakra.Wrap>
            {
                props.src.twitter != null ? (
                    <Chakra.WrapItem
                    >
                        <React.Suspense
                            fallback={
                                <Chakra.Button
                                    isLoading={true}
                                >
                                    Loading...
                                </Chakra.Button>
                            }
                        >
                            <ExtLink
                                href={props.src.twitter}
                            >
                                <Chakra.Button
                                    leftIcon={
                                        <Chakra.Icon
                                            as={FaTwitter}
                                        />
                                    }
                                    colorScheme={"twitter"}
                                >
                                    Twitter
                                </Chakra.Button>
                            </ExtLink>
                        </React.Suspense>
                    </Chakra.WrapItem>
                ) : (<></>)
            }
            {
                props.src.pixiv != null ? (
                    <Chakra.WrapItem
                    >
                        <React.Suspense
                            fallback={
                                <Chakra.Button
                                    isLoading={true}
                                >
                                    Loading...
                                </Chakra.Button>
                            }
                        >
                            <ExtLink
                                href={props.src.pixiv}
                            >
                                <Chakra.Button
                                    leftIcon={
                                        <Chakra.Image
                                            width={"20px"}
                                            src={pixiv_logo}
                                        />
                                    }
                                    colorScheme={"gray"}
                                >
                                    Pixiv
                                </Chakra.Button>
                            </ExtLink>
                        </React.Suspense>
                    </Chakra.WrapItem>
                ) : (<></>)
            }
            {
                props.src.melonBook != null ? (
                    <Chakra.WrapItem
                    >
                        <React.Suspense
                            fallback={
                                <Chakra.Button
                                    isLoading={true}
                                >
                                    Loading...
                                </Chakra.Button>
                            }
                        >
                            <ExtLink
                                href={props.src.melonBook}
                            >
                                <Chakra.Button
                                    colorScheme={"gray"}
                                >
                                    <Chakra.Image
                                        width={"5em"}
                                        src={melonBooks_logo}
                                    />
                                </Chakra.Button>
                            </ExtLink>
                        </React.Suspense>
                    </Chakra.WrapItem>
                ) : (<></>)
            }
            {
                props.src.fanbox != null ? (
                    <Chakra.WrapItem
                    >
                        <React.Suspense
                            fallback={
                                <Chakra.Button
                                    isLoading={true}
                                >
                                    Loading...
                                </Chakra.Button>
                            }
                        >
                            <ExtLink
                                href={props.src.fanbox}
                            >
                                <Chakra.Button
                                    backgroundColor={"#faf18a"}
                                    leftIcon={
                                        <Chakra.Image
                                            width={"30px"}
                                            src={fanbox_logo}
                                        />
                                    }
                                >
                                    FanBox
                                </Chakra.Button>
                            </ExtLink>
                        </React.Suspense>
                    </Chakra.WrapItem>
                ) : (<></>)
            }
            {
                props.src.booth != null ? (
                    <Chakra.WrapItem
                    >
                        <React.Suspense
                            fallback={
                                <Chakra.Button
                                    isLoading={true}
                                >
                                    Loading...
                                </Chakra.Button>
                            }
                        >
                            <ExtLink
                                href={props.src.booth}
                            >
                                <Chakra.Button
                                    backgroundColor={"#fc4d50"}
                                    leftIcon={
                                        <Chakra.Image
                                            width={"20px"}
                                            src={booth_logo}
                                        />
                                    }
                                >
                                    Booth
                                </Chakra.Button>
                            </ExtLink>
                        </React.Suspense>
                    </Chakra.WrapItem>
                ) : (<></>)
            }
            {
                props.src.nicoVideo != null ? (
                    <Chakra.WrapItem
                    >
                        <React.Suspense
                            fallback={
                                <Chakra.Button
                                    isLoading={true}
                                >
                                    Loading...
                                </Chakra.Button>
                            }
                        >
                            <ExtLink
                                href={props.src.nicoVideo}
                            >
                                <Chakra.Button
                                    backgroundColor={"#ffffff"}
                                    leftIcon={
                                        <Chakra.Image
                                            width={"20px"}
                                            src={nicoVideo_logo}
                                        />
                                    }
                                >
                                    nicoVideo
                                </Chakra.Button>
                            </ExtLink>
                        </React.Suspense>
                    </Chakra.WrapItem>
                ) : (<></>)
            }
            {
                props.src.skeb != null ? (
                    <Chakra.WrapItem
                    >
                        <React.Suspense
                            fallback={
                                <Chakra.Button
                                    isLoading={true}
                                >
                                    Loading...
                                </Chakra.Button>
                            }
                        >
                            <ExtLink
                                href={props.src.skeb}
                            >
                                <Chakra.Button
                                >
                                    <Chakra.Image
                                        width={"5em"}
                                        src={skeb_logo}
                                    />
                                </Chakra.Button>
                            </ExtLink>
                        </React.Suspense>
                    </Chakra.WrapItem>
                ) : (<></>)
            }
            {
                props.src.fantia != null ? (
                    <Chakra.WrapItem
                    >
                        <React.Suspense
                            fallback={
                                <Chakra.Button
                                    isLoading={true}
                                >
                                    Loading...
                                </Chakra.Button>
                            }
                        >
                            <ExtLink
                                href={props.src.fantia}
                            >
                                <Chakra.Button
                                >
                                    <Chakra.Image
                                        width={"5em"}
                                        src={fantia_logo}
                                    />
                                </Chakra.Button>
                            </ExtLink>
                        </React.Suspense>
                    </Chakra.WrapItem>
                ) : (<></>)
            }
            {
                props.src.tumblr != null ? (
                    <Chakra.WrapItem
                    >
                        <React.Suspense
                            fallback={
                                <Chakra.Button
                                    isLoading={true}
                                >
                                    Loading...
                                </Chakra.Button>
                            }
                        >
                            <ExtLink
                                href={props.src.tumblr}
                            >
                                <Chakra.Button
                                    colorScheme={"blackAlpha"}
                                    leftIcon={
                                        <Chakra.Image
                                            width={"20px"}
                                            src={tumblr_logo}
                                        />
                                    }
                                >
                                    Tumblr
                                </Chakra.Button>
                            </ExtLink>
                        </React.Suspense>
                    </Chakra.WrapItem>
                ) : (<></>)
            }
            {
                props.src.youtube != null ? (
                    <Chakra.WrapItem
                    >
                        <React.Suspense
                            fallback={
                                <Chakra.Button
                                    isLoading={true}
                                >
                                    Loading...
                                </Chakra.Button>
                            }
                        >
                            <ExtLink
                                href={props.src.youtube}
                            >
                                <Chakra.Button
                                    colorScheme={"red"}
                                    leftIcon={
                                        <FaYoutube />
                                    }
                                >
                                    Youtube
                                </Chakra.Button>
                            </ExtLink>
                        </React.Suspense>
                    </Chakra.WrapItem>
                ) : (<></>)
            }
            {
                props.src.weibo != null ? (
                    <Chakra.WrapItem
                    >
                        <React.Suspense
                            fallback={
                                <Chakra.Button
                                    isLoading={true}
                                >
                                    Loading...
                                </Chakra.Button>
                            }
                        >
                            <ExtLink
                                href={props.src.weibo}
                            >
                                <Chakra.Button
                                    backgroundColor={"#ffffff"}
                                    leftIcon={
                                        <Chakra.Image
                                            width={"20px"}
                                            src={weibo_logo}
                                        />
                                    }
                                >
                                    weibo
                                </Chakra.Button>
                            </ExtLink>
                        </React.Suspense>
                    </Chakra.WrapItem>
                ) : (<></>)
            }
            {
                props.src.naver != null ? (
                    <Chakra.WrapItem
                    >
                        <React.Suspense
                            fallback={
                                <Chakra.Button
                                    isLoading={true}
                                >
                                    Loading...
                                </Chakra.Button>
                            }
                        >
                            <ExtLink
                                href={props.src.naver}
                            >
                                <Chakra.Button
                                    colorScheme={"green"}
                                    leftIcon={
                                        <Chakra.Image
                                            width={"20px"}
                                            src={naver_logo}
                                        />
                                    }
                                >
                                    Naver
                                </Chakra.Button>
                            </ExtLink>
                        </React.Suspense>
                    </Chakra.WrapItem>
                ) : (<></>)
            }
        </Chakra.Wrap>
    )
}
function Author_works(props: {
    src: Author
}) {
    const client = useHTTPClient();
    const query_key = get_author_works_query_key_byAuthor_ID({
        author_id: props.src.get_id()
    });
    return (
        <Chakra.Box
        >
            <Chakra.Text>Works : {props.src.get_some_relationshipLength("manga")}</Chakra.Text>
            <IsPingable
                client={client}
                onError={(query) => (
                    <IsPingable_defaultError
                        query={query}
                    />
                )}
                onSuccess={(query) => (
                    <Chakra.Box>
                        <CollectionComponnent_WithQuery<Manga>
                            fn={() => {
                                return get_author_works_promise({
                                    author_id: props.src.get_id(),
                                    client: client
                                });
                            }}
                            queryKey={query_key}
                            query_options={{
                                staleTime: Infinity
                            }}
                        >
                            {
                                (data: Collection<Manga>) => (
                                    <MangaList
                                        src={data.get_data()}
                                    />
                                )
                            }
                        </CollectionComponnent_WithQuery>
                    </Chakra.Box>
                )}
                onLoading={
                    <Chakra.Box>
                        <Chakra.Center>
                            <Chakra.Spinner />
                        </Chakra.Center>
                    </Chakra.Box>
                }
            />

        </Chakra.Box>
    )

}

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
                                    <Author_Page_Biography
                                        src={props.src}
                                    />
                                )
                            }
                        </Chakra.Box>
                    </Chakra.Box>
                    <Chakra.Box>
                        <Chakra.Heading size={"md"}>
                            Where to find
                        </Chakra.Heading>
                        <Chakra.Box>
                            <Author_Page_Socials
                                src={props.src}
                            />
                        </Chakra.Box>
                        <Chakra.Box>
                            <Author_works
                                {...props}
                            />
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
            <HTTPClientProvider_Query
                value={HTTPClient}
                onLoading={
                    <Chakra.Box
                        width={"100%"}
                        height={"100vh"}
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
                onError={(error) => (
                    <Chakra.Box
                        width={"100%"}
                        height={"100vh"}
                    >
                        <Chakra.AbsoluteCenter>
                            <Chakra.Box>
                                <Chakra.Alert>
                                    <Chakra.AlertIcon />
                                    <Chakra.AlertTitle>Error on Loading HTTPClient</Chakra.AlertTitle>
                                </Chakra.Alert>
                            </Chakra.Box>
                        </Chakra.AbsoluteCenter>
                    </Chakra.Box>
                )}
            >
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
            </HTTPClientProvider_Query>
        </QueryClientProvider>
    </Chakra.ChakraProvider>
))

/*test_area.render(

);*/
/**/