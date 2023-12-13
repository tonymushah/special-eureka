import React from "react";
import { Transition, Variants, motion } from "framer-motion";
import { useNavigation } from "react-router";

const variants: Variants = {
    isNormalLoad: {
        filter: "blur(4px)",
    }
};
const transition: Transition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3
};

export default function NavigationAnimation({ children }: React.PropsWithChildren) {
    const { state } = useNavigation();
    const shouldTransit = React.useMemo(() => state === "loading", [state]);
    const animate = React.useMemo(() => {
        if (shouldTransit) {
            return "isNormalLoad";
        } else {
            return "none";
        }
    }, [shouldTransit]);
    const cursor = React.useMemo(() => {
        if (shouldTransit) {
            return "wait";
        } else {
            return "default";
        }
    }, [shouldTransit]);
    return (
        <motion.div
            animate={animate}
            transition={transition}
            variants={variants}
            style={{
                cursor
            }}
        >
            {children}
        </motion.div>
    );
}