import { getExchanges } from "mizuki-urql-adapter";
import { Client } from "@urql/svelte";
import { pluginName } from "@mangadex/const";

const exchanges = [...getExchanges(pluginName)];

export const client = new Client({
	url: "graphql",
	exchanges
});
