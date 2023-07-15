import { Image, SpinnerProps } from "@chakra-ui/react";
import React from "react";
import invokeHerta, { getRandomGif } from "../invocation";

export default function HertaSpinner(props : SpinnerProps){
    const getHertaImage = React.useCallback(() => {
        return getRandomGif();
    }, []);
    const invokeKuru = React.useCallback(() => {
        invokeHerta();
    }, []);
    if(props.size == undefined){
        return (
            <Image
                src={getHertaImage()}
                w={"3.5em"}
                onClick={invokeKuru}
                {...props}
            />
        );
    }else{
        switch (props.size) {
            case "xs":
                return (
                    <Image
                        src={getHertaImage()}
                        boxSize={"1em"}
                        onClick={invokeKuru}
                        {...props}
                    />
                );
            case "sm" : 
                return (
                    <Image
                        src={getHertaImage()}
                        boxSize={"2em"}
                        onClick={invokeKuru}
                        {...props}
                    />
                );
            case "md" : 
                return (
                    <Image
                        src={getHertaImage()}
                        onClick={invokeKuru}
                        boxSize={"3.5em"}
                        {...props}
                    />
                );
            case "lg" : 
                return (
                    <Image
                        src={getHertaImage()}
                        onClick={invokeKuru}
                        boxSize={"5em"}
                        {...props}
                    />
                );
            case "xl" : 
                return (
                    <Image
                        src={getHertaImage()}
                        onClick={invokeKuru}
                        boxSize={"7em"}
                        {...props}
                    />
                );
            default:
                return (
                    <Image
                        src={getHertaImage()}
                        onClick={invokeKuru}
                        boxSize={"3.5em"}
                        {...props}
                    />
                );
        }
    }
}