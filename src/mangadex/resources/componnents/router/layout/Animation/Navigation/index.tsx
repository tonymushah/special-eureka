import React from "react";
import { Transition, Variants, motion } from "framer-motion";
import { useNavigation } from "react-router";

const variants : Variants = {
    isNormalLoad : {
        filter : "blur(4px)"
    }
};
const transition : Transition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3
};

export default function NavigationAnimation({ children } : React.PropsWithChildren){
    const navigation = useNavigation();
    return (
        <motion.div
            animate={navigation.state === "loading" ? "isNormalLoad" : undefined}
            transition={transition}
            variants={variants}
        >
            {children}
        </motion.div>
    );
}