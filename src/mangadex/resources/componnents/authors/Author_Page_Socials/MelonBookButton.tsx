import * as Chakra from "@chakra-ui/react";
import React from "react";
import melonBooks_logo from "../authors_brands_logo/Melonbooks_logo.svg";
import { useAuthorPageSocialsAuthor, ExtLink } from ".";

export function MelonBookButton() {
    const { melonBook } = useAuthorPageSocialsAuthor();
    if (melonBook != null) {
        return (
            <React.Suspense
                fallback={<Chakra.Button
                    isLoading={true}
                >
                    Loading...
                </Chakra.Button>}
            >
                <ExtLink
                    href={melonBook}
                >
                    <Chakra.Button
                        colorScheme={"gray"}
                    >
                        <Chakra.Image
                            width={"5em"}
                            src={melonBooks_logo} />
                    </Chakra.Button>
                </ExtLink>
            </React.Suspense>
        );
    } else {
        return (<React.Fragment />);
    }
}
