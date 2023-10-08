import * as Chakra from "@chakra-ui/react";
import { Aggregate } from "@mangadex/api/structures/Aggregate";
import { useAtom } from "jotai";
import { Aggregate_box } from "../aggregate/Aggregate_box";
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

function ReallAggregate({ src }: {
    src: Aggregate
}) {
    const [order,] = useAtom(orderAtom);
    return (
        <Chakra.Box>
            <Aggregate_box selected={0} src={src} separator={3} isReverse={order} />
        </Chakra.Box>
    );
}

export default function Aggregate_part({ src }: {
    src: Aggregate
}) {
    return (
        <Chakra.Box>
            <AggregateOptions />
            <ReallAggregate src={src} />
        </Chakra.Box>
    );
}
