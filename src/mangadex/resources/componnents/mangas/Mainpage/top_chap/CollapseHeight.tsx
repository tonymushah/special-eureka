import * as Chakra from "@chakra-ui/react";
import "@commons-res/flag-icons/less/flag-icons.less";
import React from "react";

export default function CollapseHeight(props: React.PropsWithChildren) {
    const [show, setShow] = React.useState(false);

    const handleToggle = () => setShow(!show);

    return (
        <React.Fragment>
            <Chakra.Box
                display={{
                    base: "none",
                    md: "contents",
                }}
                width={"fit-content"}
            >
                {
                    props.children
                }
            </Chakra.Box>
            <Chakra.Box
                display={{
                    base: "inherit",
                    md: "none"
                }}
                width={"100%"}
            >
                <Chakra.Collapse startingHeight={20} in={show}
                >
                    {
                        props.children
                    }
                </Chakra.Collapse>
            </Chakra.Box>
            <Chakra.Center>
                <Chakra.Button display={{
                    base: "inherit",
                    md: "none"
                }} size='sm' onClick={handleToggle} mt='1rem'>
                    Show {show ? "Less" : "More"}
                </Chakra.Button>
            </Chakra.Center>
        </React.Fragment>
    );
}
