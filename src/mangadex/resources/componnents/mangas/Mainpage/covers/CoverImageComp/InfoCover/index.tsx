import * as Chakra from "@chakra-ui/react";
import { useCoverImageCover } from "@mangadex/resources/componnents/covers/v1/CoverImage";
import React from "react";
import { motion } from "framer-motion";
import Flag_icons from "@mangadex/resources/componnents/FlagIcons";
import { getAllLang } from "@mangadex/resources/hooks/lang/getAllLang";
import DownloadButton from "./DownloadButton";

export function InfoCover({ isHovered }: {
    isHovered: boolean;
}) {
    const cover = useCoverImageCover();
    const languages = getAllLang();
    const locale = React.useMemo(() => languages.query.data?.find((l) => l.get_two_letter() == cover.get_locale())?.get_flag_icon() ?? "", [languages, cover]);
    return (
        <Chakra.HStack>
            <motion.div
                animate={isHovered ? {
                    opacity: 1
                } : {
                    opacity: 0.5
                }}
            >
                <Chakra.HStack>
                    <Chakra.Box>
                        <Flag_icons locale={locale} />
                    </Chakra.Box>
                    <Chakra.Text>
                        Volume {cover.get_volume()}
                    </Chakra.Text>
                </Chakra.HStack>
            </motion.div>
            <motion.div>
                <DownloadButton/>
            </motion.div>
        </Chakra.HStack>
    );
}
