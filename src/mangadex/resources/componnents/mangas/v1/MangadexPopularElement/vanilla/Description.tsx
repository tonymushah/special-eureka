import * as Chakra from "@chakra-ui/react";
import { ExtLink } from "@commons-res/components/ExtLink";
import TryCatch from "@commons-res/components/TryCatch";
import ErrorEL1 from "@mangadex/resources/componnents/error/ErrorEL1";
import get_manga_description from "@mangadex/resources/hooks/MangaStateHooks/get_manga_description";
import React from "react";
import { useProps } from "../../MangaElementDef/vanilla";
import { ReactMarkdownProps } from "react-markdown/lib/complex-types";

const ReactMarkDown = React.lazy(() => import("react-markdown"));

function OnCatch(error: Error) {
    return (
        <ErrorEL1 error={error} />
    );
}

const MDX_a: keyof JSX.IntrinsicElements | React.ComponentType<Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "ref"> & ReactMarkdownProps> = (node) => {
    return (
        <React.Suspense
            fallback={<Chakra.Skeleton width={"10px"} height={"10px"} />}
        >
            {
                node.href == undefined ? (
                    <Chakra.Link>{node.children}</Chakra.Link>
                ) : (
                    <ExtLink href={node.href}>
                        <Chakra.Link>{node.children}</Chakra.Link>
                    </ExtLink>
                )
            }
        </React.Suspense>
    );
};

const MDX_p: keyof JSX.IntrinsicElements | React.ComponentType<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref"> & ReactMarkdownProps> = (node) => {
    return (
        <React.Fragment>
            <Chakra.Text m={0} as={"span"}>{node.children}</Chakra.Text>
            <br />
        </React.Fragment>
    );
};

export default function Description() {
    const { src } = useProps();
    const {
        manga_description_query
    } = get_manga_description({
        src
    });

    if (manga_description_query.isLoading && manga_description_query.fetchStatus == "fetching") {
        return (
            <Chakra.SkeletonText
                height={"20px"}
                //borderTopLeftRadius={"10px"}
                borderBottomRightRadius={"10px"}
            />
        );
    } else if (manga_description_query.isSuccess) {
        if (manga_description_query.data.length == 0) {
            return (
                <React.Fragment />
            );
        } else {
            return (
                <Chakra.Box
                    noOfLines={5}
                    marginTop={2}
                >
                    <TryCatch
                        catch={OnCatch}
                    >
                        <ReactMarkDown
                            components={{
                                a: MDX_a,
                                p : MDX_p
                            }}
                        >
                            {manga_description_query.data[0].get_data()}
                        </ReactMarkDown>
                    </TryCatch>
                </Chakra.Box>
            );
        }
    } else if (manga_description_query.isError) {
        return (
            <ErrorEL1 error={manga_description_query.error} />
        );
    } else {
        return (
            <React.Fragment />
        );
    }

}