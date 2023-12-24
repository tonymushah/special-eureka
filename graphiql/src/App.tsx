import { Fetcher } from '@graphiql/toolkit'
import GraphiQL from 'graphiql'
import { invoke as tauriInvoke, } from "@tauri-apps/api"
import 'graphiql/graphiql.min.css'
import { InvokeArgs } from '@tauri-apps/api/tauri'
import "./App.css"

async function invoke<T = unknown>(command: string, args: InvokeArgs): Promise<T> {
    return await tauriInvoke(`plugin:mangadex-desktop-api|${command}`, args);
}

const fetcher: Fetcher = async function (params) {
    const [data,] = await invoke<[string, boolean]>("graphql", params);
    return JSON.parse(data);
}

function App() {

    return (
        <GraphiQL fetcher={fetcher} />
    )
}

export default App
