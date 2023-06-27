import React from "react";
import { Link } from "react-router-dom";
import { getMangaDexPath } from "@mangadex/index";
import { make_first_UpperCare } from "@mangadex/api/internal/Utils";
import { Author } from "@mangadex/api/structures/Author";
import { Button, VStack, Wrap, WrapItem } from "@chakra-ui/react";

const MangaDexPath = getMangaDexPath();

export function AuthorButton(props: {
    src: Author
}) {
    if (props.src !== undefined) {
        return (
            <Link to={MangaDexPath + "/author/" + props.src.get_id()}>
                <Button style={{
                fontWeight: "800"
            }} colorScheme={"blackAlpha"} variant={"solid"} size="sm" >
                    {props.src.get_Name()}
                </Button>
            </Link>
        );
    } else {
        return (<React.Fragment/>);
    }

}
type AuthorColProps = {
    src: Array<Author>,
    title: "Authors" | "Artistists";
}
export class AuthorCol extends React.Component<AuthorColProps>{
    private to_use: Array<Author>;
    private title: string;
    constructor(props: AuthorColProps) {
        super(props);
        this.to_use = this.props.src;
        this.title = this.props.title;
    }
    public build_AuthorButtons(): Array<React.ReactNode> {
        const returns: Array<React.ReactNode> = new Array<React.ReactNode>(this.to_use.length);
        for (let index = 0; index < this.to_use.length; index++) {
            returns[index] = (<AuthorButton src={this.to_use[index]} />);
        }
        return returns;
    }
    render(): React.ReactNode {
        const tagButtons: Array<React.ReactNode> = this.build_AuthorButtons();
        if (tagButtons.length > 0) {
            return (
                <VStack>
                    <h5>{make_first_UpperCare(this.title)}</h5>
                    <Wrap>
                        {tagButtons.map((element, index) => (
                            <WrapItem key={`${this.title}-${index}`}>{
                                element
                            }</WrapItem>
                        ))}
                    </Wrap>
                </VStack>
            );
        } else {
            return (<React.Fragment/>);
        }
    }
}