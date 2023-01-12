import React, { Suspense, useState } from 'react';
import { Card, Placeholder, Carousel, Popover, Alert, ListGroup, Container, Row } from 'react-bootstrap';
import ReactDOM from 'react-dom/client';
import { Await, useAsyncError, useAsyncValue, useRouteError } from 'react-router-dom';
import { Statistics_Manga } from '../../../api/structures/Statistics';
import { NumericFormat } from 'react-number-format';

function PopError(props): React.ReactNode{
    let error: string = JSON.stringify(useAsyncError());
    return (
        <div>
            <Alert variant='danger'>
                <div className=" align-content-center">
                    <p>Error</p>
                    <p>{error}</p>
                </div>
            </Alert>
        </div>
    );
}

function Box_error(props): React.ReactNode{
    let error: string = JSON.stringify(useAsyncError());
    return (
        <div>
            <Alert variant='danger'>
                <div className=" align-content-center">
                    <p>Error</p>
                    <p>{error}</p>
                </div>
            </Alert>
        </div>
    );
}
export class Popover1 extends React.Component{
    private promise_stats: Promise<Statistics_Manga>;
    constructor(props) {
        super(props);
        this.promise_stats = this.props.promise_stats;
    }
    render(): React.ReactNode {
        return (
            <Popover>
                <Popover.Header as="p">
                    {this.props.children}
                </Popover.Header>
                <Popover.Body>
                    <Suspense fallback={<p>Loading stats...</p>}>
                        <Await 
                            resolve={this.promise_stats}
                            errorElement={<PopError/>}
                            children={getted => {
                                return (
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <span>
                                                <i className="fas fa-bookmark"></i> {
                                                    getted.get_follows()
                                                } 
                                            </span>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <span>
                                                <i className="fas fa-star"></i> {
                                                    getted.get_average()
                                                } 
                                            </span>
                                        </ListGroup.Item>
                                    </ListGroup>
                                );
                            }}
                        />
                    </Suspense>
                </Popover.Body>
            </Popover>
        );
    }
}
export class State_box extends React.Component{
    private promise_stats: Promise<Statistics_Manga>;
    constructor(props) {
        super(props);
        this.promise_stats = this.props.promise_stats;
    }
    render(): React.ReactNode {
        return (
            <Container>
                <Row as="p">
                    {this.props.children}
                </Row>
                <Row>
                    <Suspense fallback={<p>Loading stats...</p>}>
                        <Await 
                            resolve={this.promise_stats}
                            errorElement={<Box_error/>}
                            children={getted => {
                                return (
                                    <>
                                        <h6><i className=' fas fa-chart-line'></i> Stats</h6>    
                                        <ListGroup>
                                            <ListGroup.Item>
                                                <span>
                                                    <i className="fas fa-bookmark"></i> {
                                                        getted.get_follows()
                                                    } 
                                                </span>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                            <span>
                                                    <i className="fas fa-star"></i> {
                                                        getted.average
                                                    } 
                                                </span>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </>
                                );
                            }}
                        />
                    </Suspense>
                </Row>
            </Container>
        );
    }
}
