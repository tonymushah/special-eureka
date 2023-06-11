import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Tag, TagLabel, TagLeftIcon, Tooltip, WrapItem } from "@chakra-ui/react";
import { Tag as MangadexTag } from "@mangadex/api/structures/Tag";
import { TagInsertion, TagInsertionMode, get_mode_tag_insertion, toggle_tag_insertion } from "./TagInsertion";

export function Tag_Insertion_(props: {
    tag: MangadexTag,
    array: Array<TagInsertion>
    onClick?: (d: Array<TagInsertion>) => void;
}) {
    const b_value = props.tag;
    const tags = props.array;
    const mode = get_mode_tag_insertion(b_value, tags);
    const colorScheme = mode != undefined ? "orange" : undefined;
    const as_ = mode != undefined ? (mode == TagInsertionMode.Include ? AddIcon : MinusIcon) : undefined;
    const label = mode != undefined ? (mode == TagInsertionMode.Include ? "This tag is included" : "This tag is excluded") : "This tag is not included or excluded";
    const variant = mode != undefined ? (mode == TagInsertionMode.Include ? "solid" : "outline") : undefined;
    return (
        <WrapItem key={b_value.get_id()}>
            <Tooltip label={label} hasArrow>
                <Tag
                    size={"lg"}
                    variant={variant}
                    colorScheme={colorScheme}
                    onClick={() => {
                        toggle_tag_insertion(b_value.get_id(), tags);
                        if (props.onClick != undefined) {
                            props.onClick(props.array);
                        }
                    }}
                >
                    <TagLeftIcon boxSize={"12px"} as={as_} />
                    <TagLabel>{b_value.get_name().en}</TagLabel>
                </Tag>
            </Tooltip>
        </WrapItem>
    );
}