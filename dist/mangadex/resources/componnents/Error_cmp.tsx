import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Chakra from "@chakra-ui/react"
import { useAsyncError, useRouteError } from 'react-router';

export function ErrorELAsync(props){
    let error : any = useAsyncError();
    return(
        <Chakra.Alert status="error">
            <Chakra.AlertIcon></Chakra.AlertIcon>
            <Chakra.AlertTitle>We caught some error</Chakra.AlertTitle>
            <Chakra.AlertDescription>
                <Chakra.Text>{error!}</Chakra.Text>
                <Chakra.Text>{error.message!}</Chakra.Text>
                <Chakra.Text>{error.detail!}</Chakra.Text>
            </Chakra.AlertDescription>
        </Chakra.Alert>
    )
}
export function ErrorELRouter(props){
    let error : any = useRouteError();
    return(
        <Chakra.Alert status="error">
            <Chakra.AlertIcon></Chakra.AlertIcon>
            <Chakra.AlertTitle>We caught some error</Chakra.AlertTitle>
            <Chakra.AlertDescription>{error.message}</Chakra.AlertDescription>
        </Chakra.Alert>
    )
}