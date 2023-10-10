import * as Chakra from "@chakra-ui/react";
import { Cover } from "@mangadex/api/structures/Cover";
import CoverImage from "@mangadex/resources/componnents/covers/v1/CoverImage";
import React from "react";
import { motion } from "framer-motion";

export function CoverModal({
    cover: selectedCover, setSelectedCover
}: {
    cover: Cover;
    setSelectedCover: (cover: Cover | undefined) => void;
}) {
    return (
        <Chakra.Center>
            <motion.div 
                //layoutId={`cover-${selectedCover.get_id()}`}
            >
                <Chakra.Card width={"md"} overflow={"hidden"}>
                    <CoverImage
                        src={selectedCover}
                        image_props={{
                            objectFit: "cover",
                            onClick() {
                                setSelectedCover(undefined);
                            }
                        }} />
                </Chakra.Card>
            </motion.div>
        </Chakra.Center>
    );
}
