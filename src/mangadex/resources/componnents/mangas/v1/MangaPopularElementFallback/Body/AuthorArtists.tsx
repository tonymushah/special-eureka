import { Skeleton, Box, HStack } from "@chakra-ui/react";
import { Link } from "@router";

function ThisTitle({ text, id }: {
    text: string,
    id: string
}) {
    return (
        <Link to={"/mangadex/author/:id"} params={{
            id
        }}>
            <Skeleton>
                <Box>{text}</Box>
            </Skeleton>
        </Link>
    );
}

export default function AuthorArtists() {
    return (
        <HStack>
            <ThisTitle text="Hiroyuki" id="ec768aea-fa7f-40c3-a67f-4c1b95cafb45" />
            <ThisTitle text="Hata Kenjiro" id="255f84b7-9176-49ca-b005-92c478440b2e" />
        </HStack>
    );
}