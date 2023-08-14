import { Box } from "@chakra-ui/react";
import { AnimatePresence, Transition, motion } from "framer-motion";
import { DoublePageImageInput } from "..";
import DoublePageImage from "../Image";
import useState from "./hooks";

const transition: Transition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.5
};

export type ActualDoublePageProps = {
    images: DoublePageImageInput[];
};

export default function ActualDoublePage({ images }: ActualDoublePageProps) {
    const { page, onNext, onPrevious } = useState({
        images
    });
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
                                <DoublePageImage src={image} onNext={onNext} onPrevious={onPrevious} />
                            </motion.div>
                        );
                    } else {
                        return (
                            <Box display={"none"} key={JSON.stringify(image)}>
                                <DoublePageImage src={image} onNext={onNext} onPrevious={onPrevious} />
                            </Box>
                        );
                    }
                })
            }
        </AnimatePresence>
    );
}