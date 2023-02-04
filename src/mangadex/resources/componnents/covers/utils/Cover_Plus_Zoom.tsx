import React from "react"
import * as Chakra from "@chakra-ui/react";
import Mangadex_cover_place_holder from "../../../imgs/cover-placeholder.png";
import Viewer from "react-viewer";
export default function Cover_Plus_Zoom(props : {
    data : string,
    image_props?: Chakra.ImageProps
}){
    const [visible, setVisible] = React.useState(false);
    return (
        <Chakra.Box>
            <Chakra.Image
                onClick={() => setVisible(true)}
                fallbackSrc={Mangadex_cover_place_holder}
                src={props.data}
                {...props.image_props}
            />
            <Viewer
                visible={visible}
                onClose={() => setVisible(false)}
                images={[{src: props.data}]}
            />
        </Chakra.Box>
    )
}