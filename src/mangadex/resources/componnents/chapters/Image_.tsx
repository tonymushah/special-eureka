import * as React from "react";
import { Card } from "react-bootstrap";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import Viewer from "react-viewer";
export function Cover_Image_(props : {
    id : string,
    src : string
}){
    const [ visible, setVisible ] = React.useState(false);
    return (
        <Card id={props.id}>
            <Viewer
                visible={visible}
                onClose={() => { setVisible(false); } }
                images={[{src: props.src, alt: ""}]}
            />
            <Card.Img onClick={() => { setVisible(true); } } src={props.src}/>
        </Card>
    );
}