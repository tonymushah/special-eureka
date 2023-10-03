import * as Chakra from "@chakra-ui/react";
import React from "react";
import pixiv_logo from "../authors_brands_logo/pixiv-seeklogo.com.svg";
import { useAuthorPageSocialsAuthor, ExtLink } from ".";

export function PixivButton() {
    const { pixiv } = useAuthorPageSocialsAuthor();
    if (pixiv != null) {
        return (
            <React.Suspense
                fallback={<Chakra.Button
                    isLoading={true}
                >
                    Loading...
                </Chakra.Button>}
            >
                <ExtLink
                    href={pixiv}
                >
                    <Chakra.Button
                        leftIcon={<Chakra.Image
                            width={"20px"}
                            src={pixiv_logo} />}
                        colorScheme={"gray"}
                    >
                        Pixiv
                    </Chakra.Button>
                </ExtLink>
            </React.Suspense>
        );
    } else {
        return (
            <React.Fragment />
        );
    }
}
