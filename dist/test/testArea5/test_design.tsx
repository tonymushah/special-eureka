import React from "react";
import ReactDOM from "react-dom/client";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import { Mangafeed } from "./Mangafeed";
TimeAgo.addLocale(en);
const test_area = ReactDOM.createRoot(document.getElementById("test_area")!);
test_area.render(<Mangafeed/>);