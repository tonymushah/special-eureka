import * as React from 'react';
import Viewer from 'react-viewer';
import { Accordion, Spinner, Button, ButtonGroup, Card, CardGroup, Container, ProgressBar, Row, Col, Collapse, Overlay, OverlayTrigger } from "react-bootstrap";
import Zoom from 'react-medium-image-zoom'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Cover } from '../../../../api/structures/Cover';

export function Cover_Image_(props){
    const [ visible, setVisible ] = React.useState(false);
    return (
        <Card id={props.id}>
            <Viewer
                visible={visible}
                onClose={() => { setVisible(false); } }
                images={[{src: props.src, alt: ''}]}
                noFooter={true}
                zoomSpeed={1}
            />
            <Card.Img onClick={() => { setVisible(true); } } src={props.src}/>
        </Card>
    );
}
export function Cover_Image_2(props){
    const [ visible, setVisible ] = React.useState(false);
    const [show, setShow] = React.useState(true);
    const target = React.useRef(null);
    let to_use: Cover = props.src;
    return (
        <Card id={props.id} className={props.className} >
            <Viewer
                visible={visible}
                onClose={() => { setVisible(false); } }
                images={[{src: to_use.get_CoverImage(), alt: "Volume " + to_use.get_volume()}]}
                noFooter={true}
                zoomSpeed={1}
            />
            <Card.ImgOverlay className="cover-volume" onClick={() => { setVisible(true); } } onMouseOver={() => {setShow(false);}} onMouseLeave={() => {setShow(true);}}>
                <Card.Title className="cover-volumeT cover-volume" hidden={show}>{"Volume " + to_use.get_volume()}</Card.Title>
            </Card.ImgOverlay>
            <Card.Img className='cover-volume-img' onClick={() => { setVisible(true); } } alt={"Volume " + to_use.get_volume()} src={to_use.get_CoverImage()}/>
            
        </Card>
    );
}