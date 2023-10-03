import * as Chakra from "@chakra-ui/react";
import React from "react";
import skeb_logo from "../authors_brands_logo/skeb_logo.svg";
import { useAuthorPageSocialsAuthor, ExtLink } from ".";

export function SkebButton() {
    const { skeb } = useAuthorPageSocialsAuthor();
    if (skeb != null) {
        return (
            <React.Suspense
                fallback={<Chakra.Button
                    isLoading={true}
                >
                    Loading...
                </Chakra.Button>}
            >
                <ExtLink
                    href={skeb}
                >
                    <Chakra.Button
                    >
                        <Chakra.Image
                            width={"5em"}
                            src={skeb_logo} />
                    </Chakra.Button>
                </ExtLink>
            </React.Suspense>
        );
    } else {
        return (<React.Fragment />);
    }
}
