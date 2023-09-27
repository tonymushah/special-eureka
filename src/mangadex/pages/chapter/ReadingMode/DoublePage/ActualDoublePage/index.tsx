import { Box } from "@chakra-ui/react";
import React from "react";
import DoublePageImage from "../Image";
import { DoublePageImageInput } from "../hooks/useDoublePageImageQuery";
import useState from "./hooks";

export type ActualDoublePageProps = {
    images: DoublePageImageInput[];
};

export default function ActualDoublePage({ images }: ActualDoublePageProps) {
    const { page, onNext, onPrevious } = useState({
        images
    });
    return (
        <React.Fragment>
            {
                images.map((image, index) => {
                    if (index == page) {
                        return (
                            <Box
                                key={JSON.stringify(image)}
                            >
                                <DoublePageImage src={image} onNext={onNext} onPrevious={onPrevious} />
                            </Box>
                        );
                    } else {
                        return (
                            <Box
                                display={"none"}
                                key={JSON.stringify(image)}
                            >
                                <DoublePageImage src={image} onNext={onNext} onPrevious={onPrevious} />
                            </Box>
                        );
                    }
                })
            }
        </React.Fragment>
    );
}