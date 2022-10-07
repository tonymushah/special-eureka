import * as React from 'react';
import Viewer from 'react-viewer';
import { Accordion, Spinner, Button, ButtonGroup, Card, CardGroup, Container, ProgressBar, Row, Col, Collapse } from "react-bootstrap";
import Zoom from 'react-medium-image-zoom'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Cover } from '../../mangadex/api/structures/Cover';
export function Cover_Image_(props){
    const [ visible, setVisible ] = React.useState(false);
    const cover_toUse: Cover = props.src;
    return (
        <Card id={props.id}>
            <Viewer
                visible={visible}
                onClose={() => { setVisible(false); } }
                images={[{src: cover_toUse.get_CoverImage(), alt: ''}]}
            />
            <Card.Img onClick={() => { setVisible(true); } } src={cover_toUse.get_CoverImage()}/>
        </Card>
    );
}