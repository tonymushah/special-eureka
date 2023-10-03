import * as Chakra from "@chakra-ui/react";
import React from "react";
import { FaTwitter } from "react-icons/fa";
import { useAuthorPageSocialsAuthor, ExtLink } from ".";

export function TwitterButton() {
    const { twitter } = useAuthorPageSocialsAuthor();

    if (twitter != null) {
        return (
            <React.Suspense
                fallback={<Chakra.Button
                    isLoading={true}
                >
                    Loading...
                </Chakra.Button>}
            >
                <ExtLink
                    href={twitter}
                >
                    <Chakra.Button
                        leftIcon={<Chakra.Icon
                            as={FaTwitter} />}
                        colorScheme={"twitter"}
                    >
                        Twitter
                    </Chakra.Button>
                </ExtLink>
            </React.Suspense>
        );
    } else {
        return (<React.Fragment />);
    }
}
