import React from "react";
import { Button } from "react-bootstrap";

const Modal_Search = React.lazy(() => import("./Modal_Search"));

export default class Form1 extends React.Component {
    modalState: boolean;
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.modalState = false
    }
    showModal() {
        if (this.modalState == false) {
            this.modalState = true;
        } else {
            this.modalState = false
        }
        this.forceUpdate();
    }
    handleChange(event: { target: { value: any; }; }) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.showModal.bind(this)}>
                    <label>
                        <input placeholder='Search' type="text" onClick={this.showModal.bind(this)} />
                    </label>
                    <Button onClick={this.showModal.bind(this)}><i className='fas fa-search'></i> </Button>
                </form>
                <React.Suspense>
                    <Modal_Search show={this.modalState} onHide={this.showModal.bind(this)} />
                </React.Suspense>
            </div>
        );
    }
}