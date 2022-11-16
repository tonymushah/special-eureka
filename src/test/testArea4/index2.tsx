import React from "react"
import ReactDOM from 'react-dom/client';
import { Api_Request } from "../../mangadex/api/internal/Api_Request";
import ReactJson from 'react-json-view';
import { getClient, Response } from "@tauri-apps/api/http";

const client = await getClient();
client.get("http://localhost:8090").then(((value : Response<any>) => {
    ReactDOM.createRoot(document.getElementById("root")!).render(
        <ReactJson src={value.data}></ReactJson>
    )
})).catch((e) => {
    ReactDOM.createRoot(document.getElementById("root")!).render(
        <>{e}</>
    )
})