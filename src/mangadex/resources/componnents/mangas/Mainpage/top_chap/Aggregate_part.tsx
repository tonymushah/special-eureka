import * as Chakra from "@chakra-ui/react";
import { Aggregate } from "@mangadex/api/structures/Aggregate";
import { Aggregate_box, Aggregate_box_reverse } from "../aggregate/Aggregate_box";
import { atom, useAtom } from "jotai";

const orderAtom = atom(true);

export default function Aggregate_part(props: {
    src: Aggregate
}) {
    const [order, setOrder] = useAtom(orderAtom);
    return (
        <Chakra.Box>
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
            <Chakra.Box>
                {
                    order == false ? (
                        <Aggregate_box selected={0} src={props.src} separator={3}/>
                    ) : (
                        <Aggregate_box_reverse selected={0} src={props.src} separator={3}/>
                    )
                }
            </Chakra.Box>
        </Chakra.Box>
    );
}
