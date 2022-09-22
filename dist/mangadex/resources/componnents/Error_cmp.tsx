import React from 'react';
import { Container, Row } from 'react-bootstrap';
import ReactDOM from 'react-dom/client';

export class Error_cmp extends React.Component{
    constructor(props){
        super(props);
    }
    render(): React.ReactNode {
        let error = this.props.error;
        return (
            <Container>
                <Row>
                    <h2>We caught some error while loading the ressources</h2>
                </Row>
                <Row>
                    <h3>Details</h3>
                    <br/>
                    <div>
                        {error}
                    </div>
                </Row>
            </Container>
        )
    }
}