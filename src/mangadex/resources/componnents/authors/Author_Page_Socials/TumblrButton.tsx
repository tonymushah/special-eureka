import * as Chakra from "@chakra-ui/react";
import React from "react";
import tumblr_logo from "../authors_brands_logo/tumblr_logo.svg";
import { useAuthorPageSocialsAuthor, ExtLink } from ".";

export function TumblrButton() {
    const { tumblr } = useAuthorPageSocialsAuthor();
    if (tumblr != null) {
        return (
            <React.Suspense
                fallback={<Chakra.Button
                    isLoading={true}
                >
                    Loading...
                </Chakra.Button>}
            >
                <ExtLink
                    href={tumblr}
                >
                    <Chakra.Button
                        colorScheme={"blackAlpha"}
                        leftIcon={<Chakra.Image
                            width={"20px"}
                            src={tumblr_logo} />}
                    >
                        Tumblr
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
