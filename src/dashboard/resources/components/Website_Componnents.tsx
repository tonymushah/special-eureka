import {
    Center, Heading, Image, LinkBox,
    LinkOverlay,
    Text, VStack
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { WebSite } from "@/websites";
export default function Website_Componnent(props: {
    to_use: WebSite
}){
    return (
        <LinkBox
            as='article'
            maxW='sm'  
            borderWidth='1px' 
            rounded='md'
            p={5}
            backgroundColor={"#ff7cb2"}
        >
            <VStack>
                <Center>
                    <Image
                    src={props.to_use.icon}
                    alt={props.to_use.label}
                    width={"4em"}
                />
                </Center>
                <Heading size={"md"}>
                    <LinkOverlay as={ReactRouterLink} to={props.to_use.route}>
                        {props.to_use.name}
                    </LinkOverlay>
                </Heading>
                <Text>
                    {props.to_use.label}
                </Text>
            </VStack>
        </LinkBox>
    );
}