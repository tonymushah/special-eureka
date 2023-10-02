import * as Chakra from "@chakra-ui/react";
import React from "react";
import Consumer from "@commons-res/components/Consumer";
import { Cover } from "@mangadex/api/structures/Cover";
import { get_cover_art_image } from "@mangadex/resources/hooks/CoverStateHooks";
import Mangadex_cover_not_found from "@mangadex/resources/imgs/cover-not-found.jpg";
import Mangadex_placeHolder from "@mangadex/resources/imgs/cover-placeholder.png";
import { motion } from "framer-motion";
const context = React.createContext<Cover | undefined>(undefined);

export function useCoverImageCover() {
    const src = React.useContext(context);
    if (src) {
        return src;
    } else {
        throw new Error("The Cover Image Element should be declared");
    }
}

function CoverImageCoverProvider({ value, children }: React.PropsWithChildren<{
    value: Cover
}>) {
    return (
        <context.Provider value={value}>
            {
                children
            }
        </context.Provider>
    );
}

export default function CoverImage(props: {
    src: Cover,
    isThumbail?: boolean,
    size?: 256 | 512,
    image_props?: Chakra.ImageProps
    other_comp?: (data: string) => React.ReactNode
}) {
    const { cover_image_query } = get_cover_art_image({
        src: props.src,
        isThumbail: props.isThumbail,
        size: props.size
    });

    if (cover_image_query.isSuccess) {
        if (props.other_comp !== undefined) {
            return (
                <CoverImageCoverProvider value={props.src}>
                    <Consumer to_consume={cover_image_query.data}>
                        {
                            props.other_comp
                        }
                    </Consumer>
                </CoverImageCoverProvider>
            );
        } else {
            return (
                <motion.div layoutId={`cover-${props.src.get_id()}`} >
                    <Chakra.Image
                        src={cover_image_query.data}
                        fallbackSrc={Mangadex_placeHolder}
                        {...props.image_props}
                    />
                </motion.div>
            );
        }
    }
    if (cover_image_query.isError) {
        if (props.other_comp !== undefined) {
            return (
                <CoverImageCoverProvider value={props.src}>
                    <Consumer to_consume={Mangadex_cover_not_found}>
                        {
                            props.other_comp
                        }
                    </Consumer>
                </CoverImageCoverProvider>
            );
        } else {
            return (
                <motion.div layoutId={`cover-${props.src.get_id()}`} >
                    <Chakra.Image
                        key={props.src.get_id()}
                        src={Mangadex_cover_not_found}
                        {...props.image_props}
                    />
                </motion.div>
            );
        }
    }
    if (props.other_comp !== undefined) {
        return (
            <CoverImageCoverProvider value={props.src}>
                <Consumer to_consume={Mangadex_cover_not_found}>
                    {
                        props.other_comp
                    }
                </Consumer>
            </CoverImageCoverProvider>
        );
    } else {
        return (
            <motion.div layoutId={`cover-${props.src.get_id()}`} >
                <Chakra.Image
                    key={props.src.get_id()}
                    src={Mangadex_placeHolder}
                    {...props.image_props}
                />
            </motion.div>
        );
    }

}