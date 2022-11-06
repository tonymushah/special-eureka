import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Container, Row, Col, Stack, Button, Navbar, NavbarBrand, Nav, Modal, ModalTitle } from 'react-bootstrap';
import Hotkeys from "react-hot-keys";
import { Kbd } from '@chakra-ui/react';
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
                        <Button variant="dark" href='/index.html'>Home Dashboard</Button>
                        <span> </span>
                        <Button variant="warning" href='/mangadex/'> <img src="/mangadex/resources/ico/ddb5721c5458b5edc9d6782a5f107119.svg" /> <span>MangaDex</span></Button>
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
