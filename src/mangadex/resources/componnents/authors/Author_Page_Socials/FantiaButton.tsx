import * as Chakra from "@chakra-ui/react";
import React from "react";
import fantia_logo from "../authors_brands_logo/fantia_logo.svg";
import { useAuthorPageSocialsAuthor, ExtLink } from ".";

export function FantiaButton() {
    const { fantia } = useAuthorPageSocialsAuthor();
    if (fantia != null) {
        return (
            <React.Suspense
                fallback={<Chakra.Button
                    isLoading={true}
                >
                    Loading...
                </Chakra.Button>}
            >
                <ExtLink
                    href={fantia}
                >
                    <Chakra.Button
                    >
                        <Chakra.Image
                            width={"5em"}
                            src={fantia_logo} />
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
