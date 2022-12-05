import React from "react";
import ReactDOM from "react-dom/client";
import { Alert, Modal } from "react-bootstrap";
import { app, tauri } from "@tauri-apps/api";

try{
    const app = window!.__TAURI__.app;
    var app_name = {};
    app.getName().then((result) => {
        app_name = result
    });
    if((typeof (app_name)) != "string" ){
        ReactDOM.createRoot(document.getElementById("verifier")!).render(
            <Modal static>
                <Modal.Header>
                    <Modal.Title>
                        You're not using the Desktop app
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className=" align-content-center">
                        <span>You're trying to access the application via a Navigator</span>
                        <br/>
                        <span>
                            So the process has been stopted
                        </span>
                    </div>
                </Modal.Body>
            </Modal>
        );
        stop()
    }
}catch(e){
    ReactDOM.createRoot(document.getElementById("verifier")!).render(
            <Modal static>
                <Modal.Header>
                    <Modal.Title>
                        You're not using the Desktop app
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className=" align-content-center">
                        <span>You're trying to access the application via a Navigator</span>
                        <br/>
                        <span>
                            So the process has been stopted
                        </span>
                    </div>
                    <div className=" align-content-center">
                        <h4>Error detail</h4>
                        <Alert variant="error">{e.message}</Alert>
                    </div>
                </Modal.Body>
            </Modal>
        );
    stop();
}