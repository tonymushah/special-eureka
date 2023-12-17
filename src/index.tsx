//import "@commons-res/fonts";
//import "@commons-res/sentry/inject";
import React from "react";
import ReactDOM from "react-dom/client";
import { defaultOptions } from "@commons-res/sentry";
//import { createGraphiQLFetcher } from "@graphiql/toolkit";
//import { Routes } from "@generouted/react-router/lazy";
import { GraphiQL } from "graphiql";
import Close_splashscreen from "@splashscreen/Close_splashscreen";
import { invoke } from "@mangadex/plugin";
import { FetcherReturnType } from "@graphiql/toolkit";
import "graphiql/graphiql.min.css";
import "@commons-res/graphiql.css";

window.Sentry.init(
    defaultOptions
);

const appElement = document.getElementById("app");

//console.log(appWindow.label);

if (appElement != undefined) {
    const app = ReactDOM.createRoot(appElement);
    app.render(
        <React.StrictMode>
            {
                /*
                <Routes />
                */
            }
            <GraphiQL fetcher={async (params) => {
                const res = await invoke<[string, boolean]>("graphql", params);
                const res_: FetcherReturnType = JSON.parse(res[0]);
                return res_;
            }} />
            <Close_splashscreen />
        </React.StrictMode>
    );
}