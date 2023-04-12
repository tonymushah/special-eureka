import * as Chakra from "@chakra-ui/react";
import { Cover } from "@mangadex/api/structures/Cover";
import CoverImage from "@mangadex/resources/componnents/covers/v1/CoverImage";
import React from "react";
import { motion } from "framer-motion";

function Image_Part_pHoverVolume(props: {
    cover: Cover
}) {
    return (
        <CoverImage
                isThumbail={true}
                size={256}
                src={props.cover}
                other_comp={(e) => (
                    <motion.img
                        style={{
                            "borderRadius" : "10px"
                        }}
                        src={e}
                        whileHover={{
                            scale: 1.1
                        }}
                    />
                )}
        />
    );
}

function MangaPage_CoverImage(props: {
    cover: Cover
}) {
    const { isOpen, onOpen, onClose } = Chakra.useDisclosure();
    return (
        <React.Fragment>
            <Chakra.WrapItem
                padding={"10px"}
                width={"10em"}
                onClick={onOpen}
            >
                <Image_Part_pHoverVolume cover={props.cover}/>
            </Chakra.WrapItem>
            <Chakra.Modal isOpen={isOpen} onClose={onClose}>
                <Chakra.ModalOverlay />
                <Chakra.ModalContent>
                    <Chakra.ModalCloseButton />
                    <Chakra.Card>
                        <CoverImage
                            src={props.cover}
                        />
                    </Chakra.Card>
                </Chakra.ModalContent>
            </Chakra.Modal>
        </React.Fragment>
    );
}

export default function MangaPage_Cover(props: {
    covers: Array<Cover>
}) {
    return (
        <React.Fragment>
            {props.covers.map((value) => (
                <MangaPage_CoverImage cover={value} key={value.get_id()} />
            ))}
        </React.Fragment>
    );
}