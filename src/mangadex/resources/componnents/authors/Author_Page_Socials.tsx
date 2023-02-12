import * as Chakra from "@chakra-ui/react";
import React from "react";
import { FaTwitter, FaYoutube } from "react-icons/fa";
import { Author } from "../../../api/structures/Author";
import booth_logo from "./authors_brands_logo/booth.ico";
import fanbox_logo from "./authors_brands_logo/fanbox.ico";
import fantia_logo from "./authors_brands_logo/fantia_logo.svg";
import melonBooks_logo from "./authors_brands_logo/Melonbooks_logo.svg";
import naver_logo from "./authors_brands_logo/naver_logo.ico";
import nicoVideo_logo from "./authors_brands_logo/nicoVideo_logo.jpg";
import pixiv_logo from "./authors_brands_logo/pixiv-seeklogo.com.svg";
import skeb_logo from "./authors_brands_logo/skeb_logo.svg";
import tumblr_logo from "./authors_brands_logo/tumblr_logo.svg";
import weibo_logo from "./authors_brands_logo/weibo_logo.ico";

const ExtLink = React.lazy(async () => {
    let res = await import("../../../../commons-res/components/ExtLink");
    return {
        default: res.ExtLink
    };
})

export default function Author_Page_Socials(props: {
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