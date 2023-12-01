
export default function get_author_works_query_key_byAuthor_ID(props: {
    author_id: string;
}) {
    return ["mdx", "author", props.author_id, "works"];
}
