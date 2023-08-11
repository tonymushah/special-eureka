import { Mangadex_suspense } from "@mangadex/index";
import { Transition, Variants, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import NavigationAnimation from "./Navigation";
import { defaultTransition } from "@mangadex/resources/constants/animation";

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

const pageTransition: Transition = defaultTransition;

export default function AnimationLayout() {
    const { pathname } = useLocation();
    return (
        <NavigationAnimation>
            <motion.div
                key={pathname}
                initial="initial"
                animate={"in"}
                exit={"out"}
                variants={pageVariants}
                transition={pageTransition}
            >
                <Mangadex_suspense>
                    <Outlet />
                </Mangadex_suspense>
            </motion.div>
        </NavigationAnimation>
    );
}
