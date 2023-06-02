import * as Chakra from "@chakra-ui/react";
import { trackEvent } from "@mangadex";
import { useAsyncError, useRouteError } from "react-router";

export function ErrorELAsync1(){
    const error : any = useAsyncError();
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
                    <Chakra.Text>Details</Chakra.Text>
                    <Chakra.Text>{JSON.stringify(error)}</Chakra.Text>
                </Chakra.Box>
            </Chakra.AlertDescription>
        </Chakra.Alert>
    );
}

export function ErrorELAsyncWithStack(){
    const error : any = useAsyncError();
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
                    <Chakra.Text>{JSON.stringify(error)}</Chakra.Text>
                    <Chakra.Text>{error?.stack}</Chakra.Text>
                </Chakra.Box>
            </Chakra.AlertDescription>
        </Chakra.Alert>
    );
}

export function ErrorELAsync(){
    const error : any = useAsyncError();
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
                    <Chakra.Text>{error.message}</Chakra.Text>
                    <Chakra.Box overflow={"scroll"}>{
                        error.stack
                        }</Chakra.Box>
                </Chakra.Box>
            </Chakra.AlertDescription>
        </Chakra.Alert>
    );
}
export function ErrorELRouter(){
    const error : any = useRouteError();
    trackEvent("mangadex-router-error", {
        error : JSON.stringify(error)
    });
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
    );
}