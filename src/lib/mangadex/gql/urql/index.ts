import { getExchanges } from "mizuki-urql-adapter";
import { Client, cacheExchange } from "@urql/svelte";
import { pluginName } from "@mangadex/const";

const exchanges = [...getExchanges(pluginName), cacheExchange];

export const client = new Client({
    "url": "graphql",
    exchanges
});