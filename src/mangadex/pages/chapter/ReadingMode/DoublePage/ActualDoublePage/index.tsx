import React from "react";
import { DoublePageImageInput } from "..";
import { motion, AnimatePresence, Transition } from "framer-motion";
import DoublePageImage from "../Image";
import { Hide } from "@chakra-ui/react";
import { HotkeyCallback } from "react-hotkeys-hook";

const transition: Transition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.5
};

export default function ActualDoublePage({ images }: {
    images: DoublePageImageInput[]
}) {
    const [page, setPage] = React.useState(0);
    const onNext = React.useCallback<HotkeyCallback>(() => {
        if (page >= 0 && page < (images.length - 1)) {
            setPage(page + 1);
        }
    }, [page]);
    const onPrevious = React.useCallback<HotkeyCallback>(() => {
        if (page > 0 && page < images.length) {
            setPage(page - 1);
        }
    }, [page]);
    return (
        <AnimatePresence>
            {
                images.map((image, index) => {
                    if (index == page) {
                        return (
                            <motion.div initial={{
                                opacity: 0
                            }}
                                animate={{
                                    opacity: 1
                                }}
                                exit={{
                                    opacity: 0
                                }}
                                transition={transition} key={JSON.stringify(image)}
                            >
                                <DoublePageImage src={image} onNext={onNext} onPrevious={onPrevious}/>
                            </motion.div>
                        );
                    } else {
                        return (
                            <motion.div
                                initial={{
                                    opacity: 0
                                }}
                                animate={{
                                    opacity: 1
                                }}
                                exit={{
                                    opacity: 0
                                }}
                                transition={transition} key={JSON.stringify(image)}
                            >
                                <Hide>
                                    <DoublePageImage src={image} onNext={onNext} onPrevious={onPrevious}/>
                                </Hide>
                            </motion.div>
                        );
                    }
                })
            }
        </AnimatePresence>
    );
}