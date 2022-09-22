import React from "react"
import ReactDOM from 'react-dom/client';
import { Api_Request } from "../../mangadex/api/internal/Api_Request";
import ReactJson from 'react-json-view';
import { Response } from "@tauri-apps/api/http";

const root = ReactDOM.createRoot(document.getElementById("root")!);

var getted: Response<any> = await Api_Request.Sget_methods("manga");
root.render(
    <ReactJson src={getted.data}></ReactJson>
)