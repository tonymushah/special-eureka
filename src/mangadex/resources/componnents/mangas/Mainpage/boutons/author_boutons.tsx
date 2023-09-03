import React from "react";
import { Link } from "react-router-dom";
import { getMangaDexPath } from "@mangadex/index";
import { make_first_UpperCare } from "@mangadex/api/internal/Utils";
import { Author } from "@mangadex/api/structures/Author";
import { Button, Heading, VStack, Wrap, WrapItem, useToken } from "@chakra-ui/react";

const MangaDexPath = getMangaDexPath();

export function AuthorButton(props: {
    src: Author
}) {
    const gray500 = useToken("colors", "gray.500");
    if (props.src !== undefined) {
        return (
            <Link to={MangaDexPath + "/author/" + props.src.get_id()}>
                <Button m={1} style={{
                    fontWeight: "800"
                }} colorScheme={"gray"} boxShadow={`0px 0px 5px ${gray500}`} variant={"solid"} size="sm" >
                    {props.src.get_Name()}
                </Button>
            </Link>
        );
    } else {
        return (<React.Fragment />);
    }

}
type AuthorColProps = {
    src?: Array<Author | undefined>,
    title: "Authors" | "Artistists";
}

export function AuthorCol(props: AuthorColProps) {
    if ((props.src ?? [] ).length > 0) {
        return (
            <VStack display={"block"} >
                <Heading size={"md"} fontFamily={"inherit"}>{make_first_UpperCare(props.title)}</Heading>
                <Wrap>
                    {(props.src ?? []).map((element, index) => (
                        
                        <WrapItem key={`${props.title}-${index}`}>
                            {
                                element ? (
                                    <AuthorButton src={element} />
                                ) : (
                                    <React.Fragment/>
                                )
                            }
                        </WrapItem>
                    ))}
                </Wrap>
            </VStack>
        );
    } else {
        return (<React.Fragment />);
    }
}