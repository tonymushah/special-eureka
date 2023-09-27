import * as Chakra from "@chakra-ui/react";
import { Aggregate } from "@mangadex/api/structures/Aggregate";
import { Aggregate_box } from "../aggregate/Aggregate_box";
import { useAtom, useAtomValue } from "jotai";
import { orderAtom } from "./order.atom";

function AggregateOptions() {
    const [order, setOrder] = useAtom(orderAtom);
    return (
        <Chakra.Menu isLazy>
            <Chakra.MenuButton>
                {order ? ("Descending") : ("Ascending")}
            </Chakra.MenuButton>
            <Chakra.MenuList>
                <Chakra.MenuItem
                    onClick={() => {
                        setOrder(false);
                    }}
                >
                    Ascending
                </Chakra.MenuItem>
                <Chakra.MenuItem
                    onClick={() => {
                        setOrder(true);
                    }}
                >
                    Descending
                </Chakra.MenuItem>
            </Chakra.MenuList>
        </Chakra.Menu>
    );
}

export default function Aggregate_part(props: {
    src: Aggregate
}) {
    const order = useAtomValue(orderAtom);
    return (
        <Chakra.Box>
            <AggregateOptions/>
            <Chakra.Box>
                <Aggregate_box selected={0} src={props.src} separator={3} isReverse={order} />
            </Chakra.Box>
        </Chakra.Box>
    );
}
