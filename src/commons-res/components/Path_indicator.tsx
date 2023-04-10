import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Container, Row, Col, Stack, Button, Navbar, NavbarBrand, Nav, Modal, ModalTitle } from "react-bootstrap";
import Hotkeys from "react-hot-keys";
export class PathIndicator extends React.Component{
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
            this.modalState = false;
        }
        this.forceUpdate();
    }
    render(): React.ReactNode {
        return (
            <Hotkeys
                keyName='ctrl+alt+p'
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
                            Mangadex Desktop Location
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body> 
                        <p> href: {location.href}</p>
                        <p> protocol: {location.protocol}</p>
                        <p> hostname: {location.hostname}</p>
                        <p> port: {location.port}</p>
                        <p> pathname: {location.pathname}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <p>To show the path indicator : </p>
                        <p><code>Ctrl</code> + <code>Alt</code> + <code>P</code></p>
                    </Modal.Footer>
                </Modal>
            </Hotkeys>
        );
    }
}