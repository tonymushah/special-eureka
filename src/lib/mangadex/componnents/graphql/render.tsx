import type { Fetcher } from "@graphiql/toolkit";
import { GraphiQL } from "graphiql";
import type { Root } from "react-dom/client";
import "graphiql/graphiql.css";

type Options = {
	fetcher: Fetcher,
	root: Root
}

export default function render({ root, fetcher }: Options) {
	root.render(<GraphiQL fetcher={fetcher} />);
}