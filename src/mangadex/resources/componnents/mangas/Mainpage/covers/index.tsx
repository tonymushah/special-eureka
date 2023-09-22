import * as Chakra from "@chakra-ui/react";
import { Cover } from "@mangadex/api/structures/Cover";
import CoverImage from "@mangadex/resources/componnents/covers/v1/CoverImage";
import React, { MouseEventHandler } from "react";
import { motion } from "framer-motion";
import { v4 } from "uuid";

function OtherComp(e: string) {
    return (
        <motion.img
            src={e}
            style={{
                "borderRadius": "10px"
            }}
            whileHover={{
                cursor : "pointer",
                scale: 1.1
            }}
        />
    );
}

function Image_Part_pHoverVolume(props: {
    cover: Cover
}) {
    return (
        <CoverImage
            src={props.cover}
            other_comp={OtherComp}
        />
    );
}

function MangaPage_CoverImage(props: {
    cover: Cover
    onClick?: MouseEventHandler<HTMLLIElement>
}) {
    return (
        <motion.div layoutId={`cover-${props.cover.get_id()}`} >
            <Image_Part_pHoverVolume cover={props.cover} />
        </motion.div>
    );
}

function CoverModal({
    cover: selectedCover,
    setSelectedCover
}: {
    cover: Cover,
    setSelectedCover: (cover: Cover | undefined) => void
}) {
    return (
        <Chakra.Center>
            <motion.div layoutId={`cover-${selectedCover.get_id()}`} >
                <Chakra.Card width={"md"} overflow={"hidden"}>
                    <CoverImage
                        src={selectedCover}
                        image_props={{
                            objectFit: "cover",
                            onClick() {
                                setSelectedCover(undefined);
                            }
                        }}
                    />
                </Chakra.Card>
            </motion.div>
        </Chakra.Center>
    );
}

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