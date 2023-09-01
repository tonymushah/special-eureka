import React from "react";
//import MangaList from "../../mangadex/api/tsx/MangaList";
//import El_Manga_simple2 from "../../mangadex/api/tsx/Manga2";
import * as Chakra from "@chakra-ui/react";

import { useGroupRouteOutletContext } from "@mangadex/pages/groups/page";
import { ReactMarkdownProps } from "react-markdown/lib/complex-types";
import MangadexSpinner from "../../kuru_kuru/MangadexSpinner";

const ExtLink = React.lazy(async () => {
    const res = await import("@commons-res/components/ExtLink");
    return {
        default: res.ExtLink
    };
});
const ReactMarkDown = React.lazy(() => import("react-markdown"));

const a: keyof JSX.IntrinsicElements | React.ComponentType<Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "ref"> & ReactMarkdownProps> = function (node) {
    const href = React.useMemo(() => node.href, [node]);
    if (href == undefined) {
        return (<Chakra.Link>{node.children}</Chakra.Link>);
    } else {
        return (
            <ExtLink href={href}>
                <Chakra.Link>{node.children}</Chakra.Link>
            </ExtLink>
        );
    }
};

export default function Description() {
    const { group: src } = useGroupRouteOutletContext();
    const description = React.useMemo(() => src.get_description(), [src]);
    if (description != undefined && description != null) {
        return (
            <Chakra.Box>
                <Chakra.Heading fontFamily={"inherit"} size={"md"}>Group description</Chakra.Heading>
                <Chakra.Box>
                    <React.Suspense
                        fallback={<Chakra.Box
                            width={"full"}
                        >
                            <Chakra.Center>
                                <MangadexSpinner />
                            </Chakra.Center>
                        </Chakra.Box>}
                    >
                        <ReactMarkDown
                            components={{
                                a
                            }}
                        >
                            {description}
                        </ReactMarkDown>
                    </React.Suspense>
                </Chakra.Box>
            </Chakra.Box>
        );
    } else {
        return (
            <React.Fragment />
        );
    }

}