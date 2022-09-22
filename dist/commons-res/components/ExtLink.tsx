import React from "react"
import ReactDOM from 'react-dom/client';
import { Button, Modal } from 'react-bootstrap';
import { open } from '@tauri-apps/api/shell';

export class ExtLink extends React.Component{
    private href : string;
    modalState: boolean;
    public constructor(props){
        super(props);
        this.modalState = false;
        this.href = this.props.href
        this.showModal = this.showModal.bind(this);
        this.open = this.open.bind(this);
    }
    showModal(){
        if(this.modalState == false){
            this.modalState = true;
        }else{
            this.modalState = false
        }
        this.forceUpdate();
    }
    open(){
        (open(this.href)).finally(() => {
            this.showModal();
        });
    }
    public render(): React.ReactNode {
        return (
            <>
                <a id={this.props.a_id} onClick={this.showModal}>{this.props.children}</a>
                <Modal show={this.modalState} onHide={this.showModal}>
                    <Modal.Header closeButton>
                        <h2>You're quiting the app</h2>
                    </Modal.Header>
                    <Modal.Body>
                        <p>The app will open the link or the path to :</p>
                        <br/>
                        <p>{this.href}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.open}>I know what am I doing</Button>
                        <Button variant="black" onClick={this.showModal}>I want to go safe</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}