import * as Chakra from "@chakra-ui/react";
import Flag_icons from "@mangadex/resources/componnents/FlagIcons";
import LangConsumer from "@mangadex/resources/componnents/lang/LangConsumer";
import useLanguageUserOption from "@mangadex/resources/hooks/userOptions/SelectLanguage";
import React from "react";

export default function SelectLanguages() {
    const { query, handleInput, isIn, clear } = useLanguageUserOption();
    const { isOpen, onToggle } = Chakra.useDisclosure();
    if (query.isSuccess) {
        return (
            <React.Fragment>
                <Chakra.Box width={"full"}>
                <Chakra.Box color={"black"} onClick={onToggle}>
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
                                            icon={value.get_flag_icon() !== undefined ? (
                                                <Flag_icons locale={value.get_flag_icon()} />
                                            ) : (
                                                <></>
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
                            <Chakra.Wrap maxH={"sm"} overflow={"scroll"} color={"black"}>
                                {
                                    all_language.map((lang) => (
                                        <Chakra.WrapItem
                                            onClick={() => {
                                                handleInput(lang);
                                            }}
                                        >
                                            <Chakra.Checkbox isChecked={isIn(lang)}
                                            >
                                                <Chakra.HStack spacing={"5px"}>
                                                    {
                                                        lang.get_flag_icon() !== undefined ? (
                                                            <Flag_icons locale={lang.get_flag_icon()} />
                                                        ) : (
                                                            <></>
                                                        )
                                                    }
                                                    <Chakra.Text>{
                                                        lang.get_name()
                                                    }</Chakra.Text>
                                                </Chakra.HStack>
                                            </Chakra.Checkbox>
                                        </Chakra.WrapItem>
                                    ))
                                }
                                <Chakra.WrapItem onClick={() => {
                                    clear()
                                }} color={"red"}>
                                    Clear All
                                </Chakra.WrapItem>
                            </Chakra.Wrap>
                        </Chakra.Collapse>
                    )}
                </LangConsumer>
                </Chakra.Box>
            </React.Fragment>
        )
    } else {
        return (<Chakra.Tag fontFamily={"inherit"}>Loading...</Chakra.Tag>)
    }
}