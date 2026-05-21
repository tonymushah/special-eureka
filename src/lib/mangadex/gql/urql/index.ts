import { pluginName } from "@mangadex/const";
import { persistedExchange } from "@urql/exchange-persisted";
import { Client } from "@urql/svelte";
import { getExchanges } from "mizuki-urql-adapter";

const exchanges = [
	persistedExchange({
		enableForMutation: true,
		enableForSubscriptions: true
	}),
	...getExchanges(pluginName)
];

export const client = new Client({
	url: "graphql",
	exchanges
});