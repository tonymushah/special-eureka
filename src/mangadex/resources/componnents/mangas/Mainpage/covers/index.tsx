import * as Chakra from "@chakra-ui/react";
import { Cover } from "@mangadex/api/structures/Cover";
import React from "react";
import { motion } from "framer-motion";
import { v4 } from "uuid";
import { MangaPage_CoverImage } from "./MangaPage_CoverImage";
import { CoverModal } from "./CoverModal";

export default function MangaPage_Cover(props: {
    covers: Array<Cover>
}) {
    const toScrollId = React.useMemo(() => v4(), []);
    const [selectedCover, _setSelectedCover] = React.useState<Cover | undefined>();
    const [, startTransition] = React.useTransition();
    const setSelectedCover = React.useCallback((input?: Cover) => {
        startTransition(() => {
            _setSelectedCover(input);
            document.getElementById(toScrollId)?.scrollIntoView();
        });
    }, [selectedCover]);

    return (
        <React.Fragment>
            <Chakra.Box id={toScrollId}>
                {selectedCover && (
                    <CoverModal cover={selectedCover} setSelectedCover={setSelectedCover} />
                )}
            </Chakra.Box>
            <motion.div animate={{
                opacity: selectedCover ? [1, 0] : [0, 1],
            }}>
                <Chakra.Wrap>
                    {props.covers.map((value) => (
                        <Chakra.WrapItem
                            key={`cover-${value.get_id()}`}
                            padding={"10px"}
                            width={"10em"}
                            onClick={() => {
                                setSelectedCover(value);
                            }}
                        >
                            <MangaPage_CoverImage cover={value} />
                        </Chakra.WrapItem>
                    ))}
                </Chakra.Wrap>
            </motion.div>
        </React.Fragment>
    );
}