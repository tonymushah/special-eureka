import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Autoplay, Keyboard, Navigation } from "swiper";
import { Swiper } from "swiper/react";
import randomInteger from "random-int";
import { useHomeRecentlyPopular } from "..";
import Title from "../Title";
import { Slide } from "./Slide";

export function OnSuccess() {
    const query = useHomeRecentlyPopular();
    if (query.isSuccess == true) {
        return (
            <Chakra.Box width={"100%"}>
                <Title />
                <Chakra.Box>
                    <Swiper
                        initialSlide={randomInteger(0, query.data.get_data().length - 1)}
                        navigation
                        keyboard
                        autoplay
                        loop
                        modules={[Navigation, Keyboard, Autoplay]}
                    >
                        {query.data.get_data().map((value, index) => <Slide key={value.get_id()} value={value} index={index}/>)}
                    </Swiper>
                </Chakra.Box>
            </Chakra.Box>
        );
    } else {
        return (
            <React.Fragment />
        );
    }
}
