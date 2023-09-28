import { Cover } from "@mangadex/api/structures/Cover";
import React from "react";
import { motion } from "framer-motion";
import { Image_Part_pHoverVolume } from "./Image_Part_pHoverVolume";

export function MangaPage_CoverImage(props: {
    cover: Cover;
    setSelectedCover?: () => void;
}) {
    return (
        <motion.div layoutId={`cover-${props.cover.get_id()}`}>
            <Image_Part_pHoverVolume cover={props.cover} setSelectedCover={props.setSelectedCover}/>
        </motion.div>
    );
}
