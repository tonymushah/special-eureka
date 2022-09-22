import * as React from 'react';
import Viewer from 'react-viewer';
import { Accordion, Spinner, Button, ButtonGroup, Card, CardGroup, Container, ProgressBar, Row, Col, Collapse } from "react-bootstrap";
import Zoom from 'react-medium-image-zoom'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
export function Cover_Image_(props){
    const [ visible, setVisible ] = React.useState(false);
    return (
        <Card>
            <Viewer
                visible={visible}
                onClose={() => { setVisible(false); } }
                images={[{src: props.src, alt: ''}]}
            />
            <Card.Img onClick={() => { setVisible(true); } } src={props.src}/>
        </Card>
    );
}