//import "@commons-res/fonts";
//import "@commons-res/sentry/inject";
import React from "react";
import ReactDOM from "react-dom/client";
import { defaultOptions } from "@commons-res/sentry";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
//import { Routes } from "@generouted/react-router/lazy";
import "graphiql/graphiql.css";
import { GraphiQL } from "graphiql";

window.Sentry.init(
    defaultOptions
);

const appElement = document.getElementById("app");

const fetcher = createGraphiQLFetcher({
    url: "mangadex://graphql"
});

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
        </React.StrictMode>
    );
}