import { ChapterPage_outlet_context } from "@mangadex/pages/chapter/UseChapterOutletContext";
import SwipperMode from ".";
import { Controller, Keyboard } from "swiper";
import useRTLSwipperMode from "@mangadex/resources/hooks/userOptions/RtlSwipperMode";
import * as Chakra from "@chakra-ui/react";
import React from "react";
import { SwiperSlide } from "swiper/react";

export default function DoublePage({data} : {
    data : ChapterPage_outlet_context
}){
    const { query } = useRTLSwipperMode();
    if(query.isSuccess){
        return (
            <SwipperMode
                data={data}
                swipper_option={{
                    dir : query.data == true ? "rtl" : undefined,
                    slidesPerGroup : 2,
                    slidesPerView : 2,
                    modules : [Controller, Keyboard],
                    keyboard : true,
                    spaceBetween : 0,
                }}
            >
                {({ images, reading_state }) => (
                    <React.Fragment>
                        {
                            images.map((value, index) => (
                                <SwiperSlide onMouseOver={() => {
                                    reading_state.setCurrentPage(index + 1);
                                }} key={`${data.chapter.get_id()}-${index}`}>
                                    <Chakra.Container height={"100vh"} overflow={"scroll"}>
                                        <Chakra.Image
                                            fallback={
                                                <Chakra.Box width={"full"}>
                                                    <Chakra.Center>
                                                        <Chakra.Spinner
                                                            size={"xl"}
                                                            color={"orange"}
                                                            thickness={"10px"}
                                                        />
                                                    </Chakra.Center>
                                                </Chakra.Box>
                                            }
                                            src={value}
                                            id={`mdx-chapter-${data.chapter.get_id()}-${index + 1}`}
                                        />
                                    </Chakra.Container>
                                </SwiperSlide>
                            ))
                        }
                    </React.Fragment>
                )}
            </SwipperMode>
        );
    }
    return (<></>);
}