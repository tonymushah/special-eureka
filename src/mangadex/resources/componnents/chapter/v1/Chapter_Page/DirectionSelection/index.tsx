import { Button, HStack } from "@chakra-ui/react";
import useRTLSwipperMode from "@mangadex/resources/hooks/userOptions/RtlSwipperMode";
import React from "react";
import { AiOutlineRightSquare, AiOutlineLeftSquare } from "react-icons/ai";

export default function DirectionSelection(){
    const {query, toggle} = useRTLSwipperMode();
    function Handle(){
        if(query.isSuccess){
            if(query.data == true){
                return (
                    <HStack>
                        <AiOutlineLeftSquare/>
                        <React.Fragment>Right to Left</React.Fragment>
                    </HStack>
                );
            }else{
                return (
                    <HStack>
                        <AiOutlineRightSquare/>
                        <React.Fragment>Left to Right</React.Fragment>
                    </HStack>
                );
            }
        }
        return (
            <React.Fragment/>
        );
    }
    return (
        <Button isLoading={query.isLoading} onClick={toggle}>
            <Handle/>
        </Button>
    );
}