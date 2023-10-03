import * as Chakra from "@chakra-ui/react";
import { Lang } from "@mangadex/api/internal/Utils";
import Flag_icons from "@mangadex/resources/componnents/FlagIcons";
import LangConsumer from "@mangadex/resources/componnents/lang/LangConsumer";
import useLanguageUserOption from "@mangadex/resources/hooks/userOptions/SelectLanguage";
import React from "react";


function Lang_Comp({ lang }: {
    lang: Lang
}) {
    const { handleInput, isIn } = useLanguageUserOption();
    return (
        <Chakra.WrapItem
            onClick={() => {
                handleInput(lang);
            }}
        >
            <Chakra.Button
                leftIcon={
                    lang.get_flag_icon() !== undefined ? (
                        <Flag_icons locale={lang.get_flag_icon()} />
                    ) : (
                        <React.Fragment />
                    )
                }
                colorScheme={isIn(lang) ? "green" : "gray"}
                variant={isIn(lang) ? "solid" : "outline"}
            >
                {
                    lang.get_name()
                }
            </Chakra.Button>
        </Chakra.WrapItem>
    );
}

export default function SelectLanguages() {
    const { query, clear } = useLanguageUserOption();
    const { isOpen, onToggle } = Chakra.useDisclosure();
    if (query.isSuccess) {
        return (
            <React.Fragment>
                <Chakra.Box width={"full"}>
                    <Chakra.Box onClick={onToggle}>
                        {
                            query.data.length == 0 ? (
                                <Chakra.Text as={"span"} fontFamily={"inherit"}>All Languages</Chakra.Text>
                            ) : (
                                <Chakra.AvatarGroup
                                    size={"md"}
                                    max={3}
                                >
                                    {
                                        query.data.map((value) => (
                                            <Chakra.Avatar
                                                key={value.get_three_letter()}
                                                icon={value.get_flag_icon() !== undefined ? (
                                                    <Flag_icons locale={value.get_flag_icon()} />
                                                ) : (
                                                    <React.Fragment/>
                                                )}
                                            />
                                        ))
                                    }
                                </Chakra.AvatarGroup>
                            )
                        }
                    </Chakra.Box>
                    <LangConsumer>
                        {(all_language) => (
                            <Chakra.Collapse in={isOpen}>
                                <Chakra.Wrap maxH={"sm"} overflow={"scroll"}>
                                    <Chakra.WrapItem >
                                        <Chakra.Button colorScheme="red" onClick={() => {
                                            clear();
                                        }}>
                                            Clear All
                                        </Chakra.Button>
                                    </Chakra.WrapItem>
                                    {
                                        all_language.map((lang) => (
                                            <Lang_Comp lang={lang} key={JSON.stringify(lang)} />
                                        ))
                                    }
                                </Chakra.Wrap>
                            </Chakra.Collapse>
                        )}
                    </LangConsumer>
                </Chakra.Box>
            </React.Fragment>
        );
    } else {
        return (<Chakra.Tag fontFamily={"inherit"}>Loading...</Chakra.Tag>);
    }
}