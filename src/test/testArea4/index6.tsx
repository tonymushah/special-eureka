import React, { Suspense, useCallback } from "react";
import ReactDOM from "react-dom/client";
import { appDir, BaseDirectory } from "@tauri-apps/api/path";
import { Await } from "react-router-dom";
import { readTextFile } from "@tauri-apps/api/fs";
import { Client, getClient } from "@tauri-apps/api/http";
import { Languages, Lang, Lang_and_Data } from "../../mangadex/api/internal/Utils";

//const client: Client = await getClient();
const root = ReactDOM.createRoot(document.getElementById("root")!);
const tests = [
					{
						"pt-br": "Confissões E Namoradas"
					},
					{
						"es": "Ella También Es Mi Novia"
					},
					{
						"es": "Ella, y También Ella"
					},
					{
						"en": "Girlfriend, Girlfriend"
					},
					{
						"es": "Novia y Novia"
					},
					{
						"es": "Poniendo Cuernos De Manera Justa"
					},
					{
						"uk": "Дівчина, та дівчина крім неї"
					},
					{
						"ru": "Мои девушки"
					},
					{
						"ja": "カノジョも彼女"
					},
					{
						"ko": "그녀도 여친"
					},
					{
						"th": "จะคนไหนก็แฟนสาว"
					}
                ];
const Alt_titles: Array<Lang_and_Data> = await Lang_and_Data.initializeArrayByAltTitle_obj(tests);
const en = Lang_and_Data.find_data_by_lang2l("en", Alt_titles)!;
root.render(
    <>
        <ul>
                            <li>data: {en.get_data()}</li>
                            <li>name: {en.get_language().get_name()}</li>
                            <li>two_letter: {en.get_language().get_two_letter()}</li>
                            <li>three_letter: {en.get_language().get_three_letter()}</li>
                        </ul>
    </>
);
/*
                        
*/