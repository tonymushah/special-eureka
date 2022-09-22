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
import ReactTimeAgo from 'react-time-ago'

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ReactTimeAgo date={new Date("2020-10-29T08:23:37+00:00")}/>
);
/*function Errore(props): React.ReactNode{
  let errors = JSON.stringify(useAsyncError());
  return (<p>{errors}</p>);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Suspense fallback={<p>Loading</p>}>
      <Await 
        resolve={Chapter.search_chapter(
          new Offset_limits(),
          'e78b9dcf-8863-4381-8b8f-b05db41cbdde'
        )}
        errorElement={<Errore/>}
        children={getted =>{
            return (<RJson.default src={getted}/>);
          }
        }
      />
    </Suspense>
);*/