import React from "react";
import { ExtLink } from "@commons-res/components/ExtLink";
import { make_first_UpperCare } from "@mangadex/api/internal/Utils";
import { Button, VStack, Wrap, WrapItem, Heading } from "@chakra-ui/react";
type LinkButtonProps = {
    title: string,
    href: string
};
export function LinkButton(props: LinkButtonProps) {
    return (
        <ExtLink href={props.href}>
            <Button style={{
                fontWeight: "800"
            }} colorScheme={"blackAlpha"} variant={"solid"} size="sm" >{props.title}</Button>
        </ExtLink>
    );
}


type LinksRowProps = {
    src: any,
    title: "Read or Buy" | "Track";
}
export class LinksRow extends React.Component<LinksRowProps>{
    private to_use: any;
    private title: string;
    constructor(props: LinksRowProps) {
        super(props);
        this.to_use = this.props.src;
        this.title = this.props.title;
    }
    public build_LinkButtons(): Array<React.ReactNode> {
        const returns: Array<React.ReactNode> = [];
        let index = 0;
        for (const key in this.to_use) {
            if (Object.prototype.hasOwnProperty.call(this.to_use, key)) {
                const element = this.to_use[key];
                if (element == null) {
                    continue;
                } else {
                    returns[index] = (<LinkButton title={key} href={element} />);
                    index = index + 1;
                }
            }
        }
        return returns;
    }
    render(): React.ReactNode {
        const LinksButtons: Array<React.ReactNode> = this.build_LinkButtons();
        if (LinksButtons.length != 0) {
            return (
                <VStack display={"block"}>
                    <Heading size={"md"} fontFamily={"inherit"}>{make_first_UpperCare(this.title)}</Heading>
                    <Wrap>
                        {LinksButtons.map((item, index) => (
                            <WrapItem key={`${this.title}-${index}`}>{
                                item
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