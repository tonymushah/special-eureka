import * as Chakra from "@chakra-ui/react";
import React from "react";
import nicoVideo_logo from "../authors_brands_logo/nicoVideo_logo.jpg";
import { useAuthorPageSocialsAuthor, ExtLink } from ".";

export function NicoVideoButton() {
    const { nicoVideo } = useAuthorPageSocialsAuthor();
    if (nicoVideo != null) {
        return (
            <React.Suspense
                fallback={<Chakra.Button
                    isLoading={true}
                >
                    Loading...
                </Chakra.Button>}
            >
                <ExtLink
                    href={nicoVideo}
                >
                    <Chakra.LightMode>
                        <Chakra.Button
                            backgroundColor={"#ffffff"}
                            leftIcon={<Chakra.Image
                                width={"20px"}
                                src={nicoVideo_logo} />}
                        >
                            nicoVideo
                        </Chakra.Button>
                    </Chakra.LightMode>
                </ExtLink>
            </React.Suspense>
        );
    } else {
        return (<React.Fragment />);
    }
}
