import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Container, Row, Col, Stack, Button, Navbar, NavbarBrand, Nav, Modal, ModalTitle } from "react-bootstrap";
import Hotkeys from "react-hot-keys";
import { Navigator } from "./components/Navigator";
import { PathIndicator } from "./components/Path_indicator";
import "./bootstrap.css";
import "./bootstrap.bundle.js";
import { ChakraProvider } from "@chakra-ui/react";
ReactDOM.createRoot(document.getElementById("navigator")!).render(
    <ChakraProvider>
        <Navigator></Navigator>
    </ChakraProvider>
);
ReactDOM.createRoot(document.getElementById("locations")!).render(
    <ChakraProvider>
        <PathIndicator></PathIndicator>
    </ChakraProvider>
);