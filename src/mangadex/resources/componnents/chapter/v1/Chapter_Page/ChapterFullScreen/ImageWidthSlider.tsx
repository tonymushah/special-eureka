import { FullScreenOptions_Context, useFullScreenOptions_Query } from "./FullScreenOptionsProvider";
import * as Chakra from "@chakra-ui/react";
import React from "react";

export default function ImageWidthSlider() {
    const { query, updateOptions } = useFullScreenOptions_Query();
    const [showTooltip, setShowTooltip] = React.useState(false);
    return (
        <React.Fragment>
            <Chakra.Text p={0} m={0}>
                Image width :
            </Chakra.Text>
            <Chakra.Slider
                id='slider'
                defaultValue={query.data == undefined ? 0 : query.data.image_width}
                min={0}
                max={100}
                colorScheme='teal'
                onChange={(v) => {
                    const new_option: FullScreenOptions_Context = query.data == undefined ? {
                        image_width: 0
                    } : query.data;
                    new_option.image_width = v;
                    updateOptions(new_option);
                }}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <Chakra.SliderMark value={25} mt='1' ml='-2.5' fontSize='sm'>
                    25%
                </Chakra.SliderMark>
                <Chakra.SliderMark value={50} mt='1' ml='-2.5' fontSize='sm'>
                    50%
                </Chakra.SliderMark>
                <Chakra.SliderMark value={75} mt='1' ml='-2.5' fontSize='sm'>
                    75%
                </Chakra.SliderMark>
                <Chakra.SliderTrack>
                    <Chakra.SliderFilledTrack />
                </Chakra.SliderTrack>
                <Chakra.Tooltip
                    hasArrow
                    bg='teal.500'
                    color='white'
                    placement='top'
                    isOpen={showTooltip}
                    label={`${query.data == undefined ? 0 : query.data.image_width}%`}
                >
                    <Chakra.SliderThumb />
                </Chakra.Tooltip>
            </Chakra.Slider>
        </React.Fragment>
    );
}