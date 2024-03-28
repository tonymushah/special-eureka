import type { Client } from "@urql/svelte";

export default async function getClient(): Promise<Client> {
    return ((await import("./index")).client)
}