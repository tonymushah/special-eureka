import React from "react";
import { Transition, Variants, motion } from "framer-motion";
import { useNavigation } from "react-router";

const variants : Variants = {
    isNormalLoad : {
        filter : "blur(4px)",
    }
};
const transition : Transition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3
};

export default function NavigationAnimation({ children } : React.PropsWithChildren){
    const navigation = useNavigation();
    const shouldTransit = React.useMemo(() => navigation.state == "loading" || navigation.state == "submitting", [navigation]);
    const animate = React.useMemo(() => {
        if(shouldTransit){
            return "isNormalLoad";
        }else{
            return "none";
        }
    }, [navigation]);
    const cursor = React.useMemo(() => {
        if(shouldTransit){
            return "wait";
        }else{
            return "default";
        }
    }, [navigation]);
    const onClickCapture = React.useCallback<React.MouseEventHandler<HTMLDivElement>>((e) => {
        if(shouldTransit){
            e.preventDefault();
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
            onClickCapture={onClickCapture}
        >
            {children}
        </motion.div>
    );
}