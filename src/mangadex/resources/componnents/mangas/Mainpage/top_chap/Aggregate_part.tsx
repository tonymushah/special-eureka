import * as Chakra from '@chakra-ui/react';
import React from "react";
import { Aggregate } from "../../../../../api/structures/Aggregate";
import { Aggregate_box, Aggregate_box_reverse } from "../aggregate/Aggregate_box";

export default function Aggregate_part(props: {
    src: Aggregate
}) {
    const [order, setOrder] = React.useState<"desc" | "asc">("desc");
    return (
        <Chakra.Box>
            <Chakra.Menu isLazy>
                <Chakra.MenuButton>
                    {order == "desc" ? ("Descending") : ("Ascending")}
                </Chakra.MenuButton>
                <Chakra.MenuList>
                    <Chakra.MenuItem
                        onClick={() => {
                            setOrder("asc");
                        }}
                    >
                        Ascending
                    </Chakra.MenuItem>
                    <Chakra.MenuItem
                        onClick={() => {
                            setOrder("desc");
                        }}
                    >
                        Descending
                    </Chakra.MenuItem>
                </Chakra.MenuList>
            </Chakra.Menu>
            <Chakra.Box>
                {
                    order == "asc" ? (
                        <Aggregate_box selected={0} src={props.src} separator={3}></Aggregate_box>
                    ) : (
                        <Aggregate_box_reverse selected={0} src={props.src} separator={3}></Aggregate_box_reverse>
                    )
                }
            </Chakra.Box>
        </Chakra.Box>
    )
}
