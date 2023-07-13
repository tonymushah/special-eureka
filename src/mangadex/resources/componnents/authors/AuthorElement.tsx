import { HStack, LinkBox, LinkOverlay } from "@chakra-ui/react";
import TryCatch from "@commons-res/components/TryCatch";
import { getMangaDexPath } from "@mangadex/index";
import { Author } from "@mangadex/api/structures/Author";
import { RiUser6Line } from "react-icons/ri";
import { Link as ReactRouterLink } from "react-router-dom";

export default function AuthorElement(props : {
    author : Author
}){
    return (
        <LinkBox
            borderRadius={"10px"}
            border={"1px"}
            borderColor={"black"}
            p={1}
            _hover={{
                backgroundColor : "gray.100"
            }}
        >
            <HStack>
                <RiUser6Line/>
                <TryCatch
                    catch={() => (
                        <LinkOverlay>
                            {props.author.get_Name()}
                        </LinkOverlay>
                    )}
                >
                    <LinkOverlay
                        as={ReactRouterLink} 
                        to={getMangaDexPath() + `/author/${props.author.get_id()}`}
                        textDecor={"none"}
                        color={"black"}
                        _hover={{
                            color : "black"
                        }}
                    >
                        {props.author.get_Name()}
                    </LinkOverlay>
                </TryCatch>
            </HStack>
        </LinkBox>
    );
}