import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Chakra from "@chakra-ui/react"
import { useAsyncError, useRouteError } from 'react-router';

export function ErrorELAsync1(props){
    let error : any = useAsyncError();
    return(
        <Chakra.Alert 
            status="error"
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height={"max-content"}
        >
            <Chakra.AlertIcon/>
            <Chakra.AlertTitle
            >
                We caught some error
            </Chakra.AlertTitle>
            <Chakra.AlertDescription>
                <Chakra.Box>
                    <Chakra.Text>Message</Chakra.Text>
                    <Chakra.Text>{error?.message!}</Chakra.Text>
                    <Chakra.Text>{error?.stack!}</Chakra.Text>
                </Chakra.Box>
            </Chakra.AlertDescription>
        </Chakra.Alert>
    )
}

export function ErrorELAsyncWithStack(props){
    let error : any = useAsyncError();
    return(
        <Chakra.Alert 
            status="error"
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height={"max-content"}
        >
            <Chakra.AlertIcon/>
            <Chakra.AlertTitle
            >
                We caught some error
            </Chakra.AlertTitle>
            <Chakra.AlertDescription>
                <Chakra.Box>
                    <Chakra.Text>Message</Chakra.Text>
                    <Chakra.Text>{error?.message!}</Chakra.Text>
                    <Chakra.Text>{error?.stack!}</Chakra.Text>
                </Chakra.Box>
            </Chakra.AlertDescription>
        </Chakra.Alert>
    )
}

export function ErrorELAsync(props){
    let error : any = useAsyncError();
    return(
        <Chakra.Alert 
            status="error"
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height={"max-content"}
        >
            <Chakra.AlertIcon/>
            <Chakra.AlertTitle
            >
                We caught some error
            </Chakra.AlertTitle>
            <Chakra.AlertDescription>
                <Chakra.Box>
                    <Chakra.Text>Message</Chakra.Text>
                    <Chakra.Text>{error?.message!}</Chakra.Text>
                </Chakra.Box>
            </Chakra.AlertDescription>
        </Chakra.Alert>
    )
}
export function ErrorELRouter(props){
    let error : any = useRouteError();
    return(
        <Chakra.Alert 
            status="error"
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height={"max-content"}
        >
            <Chakra.AlertIcon/>
            <Chakra.AlertTitle 
            >
                We caught some error
            </Chakra.AlertTitle>
            <Chakra.AlertDescription>
                <Chakra.Box>
                    <Chakra.Text>Message</Chakra.Text>
                    <Chakra.Text>{error!.message!}</Chakra.Text>
                </Chakra.Box>
                {
                    error!.stack? (<Chakra.Box>
                        <Chakra.Text>Details</Chakra.Text>
                        <Chakra.Text>{error.stack!}</Chakra.Text>
                    </Chakra.Box>) : (<></>)
                }
            </Chakra.AlertDescription>
        </Chakra.Alert>
    )
}