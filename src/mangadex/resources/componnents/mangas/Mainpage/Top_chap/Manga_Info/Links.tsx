import * as Chakra from "@chakra-ui/react";
import { MangaLinksData } from "@mangadex/api/internal/Utils";
import React from "react";
import { LinksRow } from "../../boutons/links_boutons";
import { useManga } from "@mangadex/pages/manga";

export function Links() {
    const { toUse: src } = useManga();
    const links = React.useMemo(() => {
        try {
            return MangaLinksData.build_wAny(src.get_links());
            // eslint-disable-next-line no-empty
        } catch (error) {
            return null;
        }
    }, [src]);
    return (
        <React.Fragment>
            <Chakra.WrapItem>
                <React.Fragment>
                    {links == null ? (<React.Fragment />) : (<LinksRow src={links.read_or_buy()} title="Read or Buy" />)}
                </React.Fragment>
            </Chakra.WrapItem>
            <Chakra.WrapItem>
                <React.Fragment>
                    {links == null ? (<React.Fragment />) : (<LinksRow src={links.track()} title="Track" />)}
                </React.Fragment>
            </Chakra.WrapItem>
        </React.Fragment>
    );
}
