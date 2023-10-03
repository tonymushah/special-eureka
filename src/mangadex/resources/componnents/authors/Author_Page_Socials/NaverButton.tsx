import * as Chakra from "@chakra-ui/react";
import React from "react";
import naver_logo from "../authors_brands_logo/naver_logo.ico";
import { useAuthorPageSocialsAuthor, ExtLink } from ".";

export function NaverButton() {
    const { naver } = useAuthorPageSocialsAuthor();
    if (naver != null) {
        return (
            <React.Suspense
                fallback={<Chakra.Button
                    isLoading={true}
                >
                    Loading...
                </Chakra.Button>}
            >
                <ExtLink
                    href={naver}
                >
                    <Chakra.Button
                        colorScheme={"green"}
                        leftIcon={<Chakra.Image
                            width={"20px"}
                            src={naver_logo} />}
                    >
                        Naver
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
