import React from "react";
import { motion } from "framer-motion";
import { InfoCover } from "./InfoCover";

export function CoverImageComp({ src: e }: {
    src: string;
}) {
    const [isHovered, setIsHovered] = React.useState(false);
    return (
        <motion.div
            whileHover={{
                cursor: "pointer",
                scale: 1.1
            }}
            onHoverStart={() => {
                setIsHovered(true);
            }}
            onHoverEnd={() => {
                setIsHovered(false);
            }}
        >
            <motion.img
                src={e}
                style={{
                    "borderRadius": "10px"
                }}
            />
            <InfoCover isHovered={isHovered} />
        </motion.div>
    );
}
