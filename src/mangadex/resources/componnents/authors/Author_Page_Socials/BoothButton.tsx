import * as Chakra from "@chakra-ui/react";
import React from "react";
import booth_logo from "../authors_brands_logo/booth.ico";
import { useAuthorPageSocialsAuthor, ExtLink } from ".";

export function BoothButton() {
    const { booth } = useAuthorPageSocialsAuthor();
    if (booth != null) {
        return (
            <React.Suspense
                fallback={<Chakra.Button
                    isLoading={true}
                >
                    Loading...
                </Chakra.Button>}
            >
                <ExtLink
                    href={booth}
                >
                    <Chakra.Button
                        backgroundColor={"#fc4d50"}
                        leftIcon={<Chakra.Image
                            width={"20px"}
                            src={booth_logo} />}
                    >
                        Booth
                    </Chakra.Button>
                </ExtLink>
            </React.Suspense>
        );
    } else {
        return (<React.Fragment />);
    }
}
