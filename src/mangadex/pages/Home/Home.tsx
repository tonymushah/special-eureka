import * as Chakra from "@chakra-ui/react";
import { useTrackEvent } from "@mangadex/index";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
import { useAppWindowTitle } from "@mangadex/resources/hooks/TauriAppWindow";
import React from "react";

const HomePageAfterPing = React.lazy(() => import("@mangadex/pages/Home/HomeAfterPing"));

function Home() {
    const setTitle = useAppWindowTitle();
    React.useEffect(() => {
        setTitle("High Quality Image, no ads | Mangadex");
    }, []);
    useTrackEvent("mangadex-index-page-entrance");
    return (
        <Chakra.Box
            margin={2}
        >
            <React.Suspense
                fallback={
                    <Chakra.AbsoluteCenter>
                        <MangadexSpinner
                            size={"lg"}
                        />
                    </Chakra.AbsoluteCenter>
                }
            >
                <HomePageAfterPing/>
            </React.Suspense>
        </Chakra.Box>
    );
}

export default Home;

