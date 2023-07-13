import { Alert, AlertDescription, AlertIcon, AlertTitle, Card, CardBody, ResponsiveValue } from "@chakra-ui/react";
import TryCatch from "@commons-res/components/TryCatch";
import React from "react";

export function ErrorBoundaryComp({error} : {
    error : Error | string
}){
    const card_maxHeight: ResponsiveValue<string> = {
        base: "10em"
    };
    if(error instanceof Error){
        return (
            <Card maxHeight={card_maxHeight} direction={"row"} overflowY={"hidden"} minWidth={"sm"} border={"1px"} borderColor={"#cccccc"}>
                <CardBody>
                    <Alert status="error">
                        <AlertIcon/>
                        <AlertTitle noOfLines={1}>
                            {error.name}
                        </AlertTitle>
                        <AlertDescription noOfLines={1}>
                            {error.message}
                        </AlertDescription>
                    </Alert>
                </CardBody>
            </Card>
        );
    }else{
        return (
            <Card maxHeight={card_maxHeight} direction={"row"} overflowY={"hidden"} minWidth={"sm"} border={"1px"} borderColor={"#cccccc"}>
                <CardBody>
                    <Alert status="error">
                        <AlertIcon/>
                        <AlertTitle>
                            Unexpected error
                        </AlertTitle>
                        <AlertDescription noOfLines={1}>
                            {error}
                        </AlertDescription>
                    </Alert>
                </CardBody>
            </Card>
        );
    }
}

export default function ErrorBoundary({children} : React.PropsWithChildren){
    return (
        <TryCatch
            catch={(error) => (
                <ErrorBoundaryComp error={error}/>
            )}
        >
            {children}
        </TryCatch>
    );
}