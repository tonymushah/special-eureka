import React, { Suspense, useCallback } from "react"
import ReactDOM from 'react-dom/client';
import { appDir, BaseDirectory } from '@tauri-apps/api/path';
import { Await } from "react-router-dom";
import { readTextFile } from "@tauri-apps/api/fs";
import { Client, getClient } from "@tauri-apps/api/http";
import { Languages, Lang, Lang_and_Data } from "../../mangadex/api/internal/Utils";

const client: Client = await getClient();
const tests = JSON.parse('{"en": "Fruits Basket - Digital Colored Comics"}');
ReactDOM.createRoot(document.getElementById("root")!).render(
    <>
        <React.Suspense>
            <Await
            resolve={Lang_and_Data.initializeByTwo_letter(tests.en, "en")}
                errorElement={<p>can't find app dir</p>}
                children={(dir: Lang_and_Data) => {
                    var getted : Lang = dir.get_language();
                    return (
                        <ul>
                            <li>data: {dir.get_data()}</li>
                            <li>name: {getted.get_name()}</li>
                            <li>two_letter: {getted.get_two_letter()}</li>
                            <li>three_letter: {getted.get_three_letter()}</li>
                        </ul>
                    );
                }}
            />
        </React.Suspense>
    </>
);

/*

*/