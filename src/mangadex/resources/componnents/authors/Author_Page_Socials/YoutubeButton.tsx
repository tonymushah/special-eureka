import * as Chakra from "@chakra-ui/react";
import React from "react";
import { FaYoutube } from "react-icons/fa";
import { useAuthorPageSocialsAuthor, ExtLink } from ".";

export function YoutubeButton() {
    const { youtube } = useAuthorPageSocialsAuthor();
    if (youtube != null) {
        return (
            <React.Suspense
                fallback={<Chakra.Button
                    isLoading={true}
                >
                    Loading...
                </Chakra.Button>}
            >
                <ExtLink
                    href={youtube}
                >
                    <Chakra.Button
                        colorScheme={"red"}
                        leftIcon={<FaYoutube />}
                    >
                        Youtube
                    </Chakra.Button>
                </ExtLink>
            </React.Suspense>
        );
    } else {
        return (<React.Fragment />);
    }
}
