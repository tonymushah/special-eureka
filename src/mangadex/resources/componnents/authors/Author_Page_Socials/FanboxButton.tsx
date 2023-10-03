import * as Chakra from "@chakra-ui/react";
import React from "react";
import fanbox_logo from "../authors_brands_logo/fanbox.svg";
import { useAuthorPageSocialsAuthor, ExtLink } from ".";

export function FanboxButton() {
    const { fanbox } = useAuthorPageSocialsAuthor();

    if (fanbox != null) {
        return (
            <React.Suspense
                fallback={<Chakra.Button
                    isLoading={true}
                >
                    Loading...
                </Chakra.Button>}
            >
                <ExtLink
                    href={fanbox}
                >
                    <Chakra.Button
                        backgroundColor={"#faf18a"}
                        leftIcon={<Chakra.Image
                            width={"30px"}
                            src={fanbox_logo} />}
                    >
                        FanBox
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
