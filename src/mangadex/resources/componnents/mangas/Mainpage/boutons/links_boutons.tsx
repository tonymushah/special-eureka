import React from "react";
import { ExtLink } from "@commons-res/components/ExtLink";
import { make_first_UpperCare } from "@mangadex/api/internal/Utils";
import { Button, VStack, Wrap, WrapItem, Heading, useToken } from "@chakra-ui/react";
type LinkButtonProps = {
    title: string,
    href: string
};
export function LinkButton(props: LinkButtonProps) {
    const gray500 = useToken("colors", "gray.500");
    return (
        <ExtLink href={props.href}>
            <Button style={{
                fontWeight: "800"
            }} boxShadow={`0px 0px 5px ${gray500}`} colorScheme={"gray"} variant={"solid"} size="sm" >{props.title}</Button>
        </ExtLink>
    );
}


type LinksRowProps = {
    src: Record<string, string>,
    title: "Read or Buy" | "Track";
}

export function LinksRow({ src, title }: LinksRowProps) {
    const LinksButtons = React.useMemo(() => {
        const returns: Array<React.ReactNode> = [];
        let index = 0;
        for (const key in src) {
            if (Object.prototype.hasOwnProperty.call(src, key)) {
                const element = src[key];
                if (element == null) {
                    continue;
                } else {
                    returns[index] = (<LinkButton title={key} href={element} />);
                    index = index + 1;
                }
            }
        }
        return returns;
    }, []);
    if (LinksButtons.length != 0) {
        return (
            <VStack display={"block"}>
                <Heading size={"md"} fontFamily={"inherit"}>{make_first_UpperCare(title)}</Heading>
                <Wrap>
                    {LinksButtons.map((item, index) => (
                        <WrapItem key={`${title}-${index}`}>{
                            item
                        }</WrapItem>
                    ))}
                </Wrap>
            </VStack>
        );
    } else {
        return (<React.Fragment />);
    }
}
