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
    const animate = React.useMemo(() => {
        if(navigation.state == "loading" || navigation.state == "submitting" ){
            return "isNormalLoad";
        }else{
            return "none";
        }
    }, [navigation]);
    const cursor = React.useMemo(() => {
        if(navigation.state == "loading" || navigation.state == "submitting"){
            return "wait";
        }else{
            return "default";
        }
    }, [navigation]);
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