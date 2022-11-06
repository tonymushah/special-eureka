import React from "react";
import { Text } from "@chakra-ui/react";
import { useText } from "./About";

export default function Me(){
    const context = useText();
    return (
        <>
            <Text>About me ??</Text>
            <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias numquam facere quam et repudiandae laudantium quisquam, quidem fugiat illum quis, illo rerum doloremque ad. Possimus laboriosam recusandae atque excepturi reprehenderit.</Text>
            <Text>context : {context.text} </Text>
        </>
    )
}