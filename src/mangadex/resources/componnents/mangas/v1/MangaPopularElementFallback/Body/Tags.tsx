import { HStack, Skeleton, Tag } from "@chakra-ui/react";
import { Link } from "@router";

function ThisTag({ text }: {
    text: string
}) {
    return (
        <Skeleton>
            <Tag>
                {text}
            </Tag>
        </Skeleton>
    );
}

export default function Tags() {
    return (
        <HStack>
            <Link to={"/mangadex/manga/:id"} params={{
                id: "efb4278c-a761-406b-9d69-19603c5e4c8b"
            }}>
                <ThisTag text="Hyakkano" />
            </Link>
            <Link to={"/mangadex/manga/:id"} params={{
                id: "efb4278c-a761-406b-9d69-19603c5e4c8b"
            }}>
                <ThisTag text="Rouhou" />
            </Link>
            <Link to={"/mangadex/manga/:id"} params={{
                id: "732dc0ec-bdba-431b-9be1-40ca1d235dd4"
            }}>
                <ThisTag text="S-Rank Adventurers" />
            </Link>
            <Link to={"/mangadex/manga/:id"} params={{
                id: "243bb1be-fc66-4c1a-8615-4c46f2042f00"
            }}>
                <ThisTag text="Engagement" />
            </Link>
        </HStack>
    );
}