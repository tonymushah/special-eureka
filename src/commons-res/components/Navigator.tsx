import React from 'react';
import {Stack, Button, Modal} from 'react-bootstrap';
import Hotkeys from "react-hot-keys";
import { Kbd } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import * as Chakra from "@chakra-ui/react";
export class Navigator extends React.Component{
    modalState: boolean;
    public constructor(props){
        super(props);
        this.modalState = false;
        this.showModal = this.showModal.bind(this);
    }
    showModal(){
        if(this.modalState == false){
            this.modalState = true;
        }else{
            this.modalState = false
        }
        this.forceUpdate();
    }
    render(): React.ReactNode {
        return (
            <Hotkeys
                keyName='ctrl+k'
                onKeyDown={this.showModal}
            >
                <Modal 
                    show={this.modalState}
                    onHide={this.showModal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header 
                        closeButton
                    >
                        <Modal.Title>
                            Mangadex Desktop Navigator
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body> 
                        <Button variant="dark" href='/'>Home Dashboard</Button>
                        <span> </span>
                        <Button variant="warning" href='/mangadex/'> 
                        <Chakra.Center>
                            <img src="/mangadex/resources/ico/ddb5721c5458b5edc9d6782a5f107119.svg" /> <span>MangaDex</span>
                        </Chakra.Center>
                            
                        </Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <p>To use the Navigator : </p>
                        <p><Kbd
                            textColor={"black"}
                        >Ctrl</Kbd> + <Kbd
                            textColor={"black"}
                        >K</Kbd></p>
                    </Modal.Footer>
                </Modal>
            </Hotkeys>
        );
    }
}
export class NavigatorReactRouter extends React.Component{
    modalState: boolean;
    public constructor(props){
        super(props);
        this.modalState = false;
        this.showModal = this.showModal.bind(this);
    }
    showModal(){
        if(this.modalState == false){
            this.modalState = true;
        }else{
            this.modalState = false
        }
        this.forceUpdate();
    }
    render(): React.ReactNode {
        return (
            <Hotkeys
                keyName='ctrl+k'
                onKeyDown={this.showModal}
            >
                <Modal 
                    show={this.modalState}
                    onHide={this.showModal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header 
                        closeButton
                    >
                        <Modal.Title>
                            Mangadex Desktop Navigator
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body> 
                        <Chakra.Button as={Link} colorScheme="blackAlpha" to='/'>Home Dashboard</Chakra.Button>
                        <span> </span>
                        <Chakra.Button as={Link} colorScheme="blackAlpha" to='/mangadex'> <img src="/mangadex/resources/ico/ddb5721c5458b5edc9d6782a5f107119.svg" /> &nbsp; <span>MangaDex</span></Chakra.Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <p>To use the Navigator : </p>
                        <p><Kbd
                            textColor={"black"}
                        >Ctrl</Kbd> + <Kbd
                            textColor={"black"}
                        >K</Kbd></p>
                    </Modal.Footer>
                </Modal>
            </Hotkeys>
        );
    }
}
