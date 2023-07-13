import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import TryCatch from "@commons-res/components/TryCatch";
import React from "react";
import { useProps } from "../../v1/MangaElementDef/vanilla";
import { Manga_Page_Statis } from "../Manga_Page_Statis";

const IsPingable = React.lazy(() => import("@mangadex/resources/componnents/IsPingable"));

export default function Statis() {
    const { src } = useProps();
    const client = useHTTPClient();
    return (
        <React.Suspense
            fallback={
                <Chakra.Skeleton
                    height={"20px"}
                    width={"md"}
                />
            }
        >
            <IsPingable
                client={client}
                onError={() => (
                    <React.Fragment/>
                )}
                onLoading={
                    <Chakra.Skeleton
                        height={"20px"}
                        width={"md"}
                    />
                }
                onSuccess={() => (
                    <TryCatch
                        catch={(error) => (
                            <Chakra.Box>
                                <Chakra.Text>{error.message}</Chakra.Text>
                                <Chakra.Box>{error.stack}</Chakra.Box>
                            </Chakra.Box>
                        )}
                    >
                        <Manga_Page_Statis
                            src={src}
                        />
                    </TryCatch>
                )}
            />
        </React.Suspense>
    );
}