import { HStack, Text, Tooltip } from "@chakra-ui/react";
import React from "react";

function ThisTooltip({ label, children }: React.PropsWithChildren<{
    label?: React.ReactNode
}>){
    if(label != undefined){
        return (
            <Tooltip>
                {children}
            </Tooltip>
        );
    }else{
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }
}

export default function BasicTwoElement({title, children, tooltipLabel} : React.PropsWithChildren<{
    title: string,
    tooltipLabel?: React.ReactNode
}>){
    
    return (
        <HStack>
            <ThisTooltip label={tooltipLabel}>
                <Text as={"span"}>{title} : </Text>
            </ThisTooltip>
            <React.Fragment>
                {children}
            </React.Fragment>
        </HStack>
    );
}