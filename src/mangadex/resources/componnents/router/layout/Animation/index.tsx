import { Transition, Variants, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import NavigationAnimation from "./Navigation";

const pageVariants: Variants = {
    initial: {
        opacity: 0
    },
    in: {
        opacity: 1
    },
    out: {
        opacity: 0
    }
};

const pageTransition: Transition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3
};

export default function AnimationLayout() {
    const { pathname } = useLocation();
    return (
        <motion.div
            key={pathname}
            initial="initial"
            animate={"in"}
            exit={"out"}
            variants={pageVariants}
            transition={pageTransition}
        >
            <NavigationAnimation>
                <Outlet />
            </NavigationAnimation>
        </motion.div>
    );
}
