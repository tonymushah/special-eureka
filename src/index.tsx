//import "@commons-res/fonts";
//import "@commons-res/sentry/inject";
import React from "react";
import ReactDOM from "react-dom/client";
import { defaultOptions } from "@commons-res/sentry";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
//import { Routes } from "@generouted/react-router/lazy";
import "graphiql/graphiql.css";
import { GraphiQL } from "graphiql";
import Close_splashscreen from "@splashscreen/Close_splashscreen";
import { appWindow } from "@tauri-apps/api/window";

window.Sentry.init(
    defaultOptions
);

const appElement = document.getElementById("app");

const fetcher = createGraphiQLFetcher({
    url: "mangadex://graphql",
    "headers": {
        "window": appWindow.label
    }
});

console.log(appWindow.label);

if (appElement != undefined) {
    const app = ReactDOM.createRoot(appElement);
    app.render(
        <React.StrictMode>
            {
                /*
                <Routes />
                */
            }
            <GraphiQL fetcher={fetcher} />
            <Close_splashscreen />
        </React.StrictMode>
    );
}