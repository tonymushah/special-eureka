import "@commons-res/fonts";
import "@commons-res/sentry/inject";
import React from "react";
import ReactDOM from "react-dom/client";
import { defaultOptions } from "@commons-res/sentry";
import { Routes } from "@generouted/react-router/lazy";

window.Sentry.init(
    defaultOptions
);

const appElement = document.getElementById("app");

if (appElement != undefined) {
    const app = ReactDOM.createRoot(appElement);
    app.render(
        <React.StrictMode>
            <Routes />
        </React.StrictMode>
    );
}