import { Image } from "@chakra-ui/react";
import { ChapterPage_outlet_context } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";
import { AnimatePresence, Transition, motion } from "framer-motion";
import ChapterImage from "../Image";
import { useSinglePageReadingHooks } from "./hooks";

const transition: Transition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.5
};

export default function ActualPage({ data }: {
    data: ChapterPage_outlet_context,
    startPage? : number
}) {
    const { page, onNext, onPrevious } = useSinglePageReadingHooks({ data });
    return (
        <AnimatePresence>
            {data.images.map((url, index) => {
                if (page == index) {
                    return (
                        <motion.div
                            key={url}
                            initial={{
                                opacity: 0
                            }}
                            animate={{
                                opacity: 1
                            }}
                            exit={{
                                opacity: 0
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