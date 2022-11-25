import React from "react"
import ReactDOM from 'react-dom/client';
import DeskApiRequest from "../../mangadex/api/offline/DeskApiRequest";
import ReactJson from 'react-json-view';
import { getClient, Response } from "@tauri-apps/api/http";
import { launch_server } from "../../mangadex/api/offline/plugin";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { Manga_with_allRelationship } from "../../mangadex/api/structures/Manga";

if((await DeskApiRequest.ping()) == false){
    await launch_server();
}

let getted = Manga_with_allRelationship.getMangaByID()
