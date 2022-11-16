import React from "react"
import ReactDOM from 'react-dom/client';
import { Button, Modal, Tooltip,OverlayTrigger } from 'react-bootstrap';
import { open } from '@tauri-apps/api/shell';

type ExtLinkProps = {
    href: string;
    a_id?: string;
    children?: React.ReactNode
}
export class ExtLink extends React.Component<ExtLinkProps>{
    private href : string;
    modalState: boolean;
    public constructor(props: ExtLinkProps){
        super(props);
        this.modalState = false;
        this.href = this.props.href;
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
                <span id={this.props.a_id!} onClick={this.showModal}>{this.props.children}</span>
                <Modal show={this.modalState} onHide={this.showModal}>
                    <Modal.Header closeButton>
                        <h2>You're quiting the app</h2>
                    </Modal.Header>
                    <Modal.Body>
                        <p>The app will open the link or the path to :</p>
                        <br/>
                        <OverlayTrigger
                            delay={{ show: 250, hide: 400 }}
                            placement="bottom"
                            overlay={<Tooltip>{this.href}</Tooltip>}
                        >
                            <h2 style={{"width": "100%"}} className=" d-inline-flex overflow-scroll">{this.href}</h2>
                        </OverlayTrigger>
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