import { Image } from "@chakra-ui/react";
import { ChapterPage_outlet_context } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";
import useChapterPages from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/useChapterPages";
import React from "react";
import { HotkeyCallback } from "react-hotkeys-hook";
import ChapterImage from "../Image";
import { AnimatePresence, Transition, motion } from "framer-motion";

const transition : Transition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.5
};

export default function zzActualPage({ data }: {
    data: ChapterPage_outlet_context
}) {
    const [page, _setPage] = React.useState(0);
    const setPage = React.useCallback((input: number) => {
        _setPage(input);
    }, [page]);
    /*const { query } = useChapterPages({
        chapter: data.chapter
    });*/
    const onNext = React.useCallback<HotkeyCallback>(() => {
        if(page >= 0 && page < (data.images.length - 1)){
            setPage((page + 1));
        }
    }, [page]);
    const onPrevious = React.useCallback<HotkeyCallback>(() => {
        if(page > 0 && page < data.images.length){
            setPage(page - 1);
        }
    }, [page]);
    return (
        <AnimatePresence>
            {data.images.map((url, index) => {
                if (page == index) {
                    return (
                        <motion.div 
                            key={url} 
                            initial={{
                                opacity : 0
                            }}
                            animate={{
                                opacity : 1
                            }}
                            exit={{
                                opacity : 0
                            }}
                            transition={transition}
                        >
                            <ChapterImage
                                src={url}
                                onNext={onNext}
                                onPrevious={onPrevious}
                            />
                        </motion.div>
                    );
                } else {
                    return (
                            <Image
                                key={url}
                                alt={url}
                                src={url}
                                display={"none"}
                            />
                    );
                }
            })}
        </AnimatePresence>
    );
}