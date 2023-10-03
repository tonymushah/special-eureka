import * as Chakra from "@chakra-ui/react";
import React from "react";
import weibo_logo from "../authors_brands_logo/weibo_logo.ico";
import { useAuthorPageSocialsAuthor, ExtLink } from ".";

export function WeiboButton() {
    const { weibo } = useAuthorPageSocialsAuthor();
    if (weibo != null) {
        return (
            <React.Suspense
                fallback={<Chakra.Button
                    isLoading={true}
                >
                    Loading...
                </Chakra.Button>}
            >
                <ExtLink
                    href={weibo}
                >
                    <Chakra.Button
                        backgroundColor={"#ffffff"}
                        leftIcon={<Chakra.Image
                            width={"20px"}
                            src={weibo_logo} />}
                    >
                        weibo
                    </Chakra.Button>
                </ExtLink>
            </React.Suspense>
        );
    } else {
        return (<React.Fragment />);
    }
}
