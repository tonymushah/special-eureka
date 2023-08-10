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

export default function ActualPage({ data }: {
    data: ChapterPage_outlet_context,
}) {
    const { query, setCurrentPage } = useChapterPages({
        chapter: data.chapter
    });

    const page = React.useMemo(() => {
        return query.data.current;
    }, [query.data.current]);
    /*
        React.useEffect(() => {
            console.log(page);
        }, [page]);
    */
    const setPage = React.useCallback((input: number) => {
        setCurrentPage(input);
    }, [page]);
    
    const onNext = React.useCallback<HotkeyCallback>(() => {
        if(page >= 0 && page < (data.images.length - 1)){
            setPage(page + 1);
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