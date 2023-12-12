import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Volume_ } from "./Volume";
import { Volume } from "@mangadex/api/structures/Volume";

export default function VolumeSlice({ src: volumes }: {
    src: Volume[];
}) {
    return (
        <Chakra.TabPanel>
            <Chakra.Accordion
                allowMultiple
                defaultIndex={[0]}
            >
                {volumes.map<React.ReactNode>((volume, index_) => (
                    <Volume_ key={`volume-${index_}`} src={volume} open={true} />
                ))}
            </Chakra.Accordion>
        </Chakra.TabPanel>
    );
}
