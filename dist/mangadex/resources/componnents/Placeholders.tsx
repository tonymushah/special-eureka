import React, { Suspense, useState } from 'react';
import { Card, Placeholder } from 'react-bootstrap';
import ReactDOM from 'react-dom/client';

export function CardPlaceHolders(props): React.ReactNode{
    return (<Card.Header><Placeholder size="lg" xs={12} animation="glow"></Placeholder></Card.Header>);
}
export function Caroussel_PlaceHolders(props): React.ReactNode{
    return (<div><Placeholder size="lg" xs={12} animation="glow"></Placeholder></div>);
}