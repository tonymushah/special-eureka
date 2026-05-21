import { pluginName } from "@mangadex/const";
import { persistedExchange } from "@urql/exchange-persisted";
import { Client } from "@urql/svelte";
import { getExchanges } from "mizuki-urql-adapter";

const exchanges = [
	persistedExchange({
		enforcePersistedQueries: true,
		enableForMutation: true,
		enableForSubscriptions: true,
		/* @ts-ignore */
		generateHash: (_, document) => Promise.resolve(document["__meta__"]["hash"])
	}),
	...getExchanges(pluginName)
];

export const client = new Client({
	url: "graphql",
	exchanges
});