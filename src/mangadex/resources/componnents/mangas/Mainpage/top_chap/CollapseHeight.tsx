import * as Chakra from "@chakra-ui/react";
import "flag-icons/css/flag-icons.min.css";
import React from "react";

export default function CollapseHeight(props: React.PropsWithChildren) {
    const [show, setShow] = React.useState(false);

    const handleToggle = () => setShow(!show);

    return (
        <>
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
            >
                <Chakra.Collapse startingHeight={20} in={show}
                >
                    {
                        props.children
                    }
                </Chakra.Collapse>
            </Chakra.Box>
            <Chakra.Button display={{
                base: "inherit",
                md: "none"
            }} size='sm' onClick={handleToggle} mt='1rem'>
                Show {show ? "Less" : "More"}
            </Chakra.Button>
        </>
    );
}
