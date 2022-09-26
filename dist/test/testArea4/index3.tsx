import React, { Suspense, useCallback } from "react"
import ReactDOM from 'react-dom/client';
import { Button } from "react-bootstrap"
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Api_Request } from "../../mangadex/api/internal/Api_Request";
import { Await, useAsyncError } from "react-router-dom";
import * as RJson from "react-json-view"
import { Body } from "@tauri-apps/api/http";
import { Chapter } from "../../mangadex/api/structures/Chapter"
import { Offset_limits } from "../../mangadex/api/internal/Utils";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import ReactTimeAgo from 'react-time-ago';


TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);
function Errore(props): React.ReactNode{
  let errors = JSON.stringify(useAsyncError());
  return (<p>{errors}</p>);
}
const querry_object: any = {
    publicationDemographic: ['seinen'],
    status: ['completed'],
    contentRating: ['suggestive']
}
ReactDOM.createRoot(document.getElementById("root")!).render(
    <Suspense fallback={<p>Loading</p>}>
      <Await 
        resolve={Api_Request.get_methods("manga", {
          query : querry_object
        })}
        errorElement={<Errore/>}
        children={getted =>{
            return (<RJson.default src={getted}/>);
          }
        }
      />
    </Suspense>
);