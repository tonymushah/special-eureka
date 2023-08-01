import { Card, Image } from "@chakra-ui/react";
import * as React from "react";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import Viewer from "react-viewer";
import CoverPlaceHolder from "@mangadex/resources/imgs/cover-placeholder.png";

type Cover_Image_Props = {
    src?: string,
    id? : string,
    alt?: string,
    fallbackElement? : string,
    fallbackImage? : string
}

export function Cover_Image_(props : Cover_Image_Props){
    const [ visible, setVisible ] = React.useState(false);
    return (
        <Card id={props.id}>
            <Image objectFit={"cover"} fallbackSrc={props.fallbackImage} borderRadius={15} onClick={() => { setVisible(true); } } src={props.src}/>
            <Viewer
                visible={visible}
                onClose={() => { setVisible(false); } }
                images={[{src: props.src ?? CoverPlaceHolder, alt: ""}]}
                noFooter={true}
                zoomSpeed={1}
            />
        </Card>
    );
}