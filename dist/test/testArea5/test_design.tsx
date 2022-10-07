import React from "react";
import ReactDOM from "react-dom/client";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import { Mangafeed } from "./Mangafeed";
import { Manga } from "../../mangadex/api/structures/Manga";
import { Asc_Desc, Offset_limits, Order } from "../../mangadex/api/internal/Utils";
import { List } from "../../mangadex/api/structures/List";
import { Cover } from "../../mangadex/api/structures/Cover";
import { Alt_title } from '../../mangadex/api/internal/Utils';
import { Await } from "react-router-dom";
import { Api_Request } from "../../mangadex/api/internal/Api_Request";
import { Response, getClient } from "@tauri-apps/api/http";
import { Chapter } from "../../mangadex/api/structures/Chapter";
import { Chapter_ } from "../../mangadex/resources/componnents/chapters/Chapter_";

TimeAgo.addLocale(en);
const test_area = ReactDOM.createRoot(document.getElementById("test_area")!);
test_area.render(
        <div>
            <p>Loading...</p>
        </div>
    );
let offset_limits_ : Offset_limits = new Offset_limits();
offset_limits_.set_limits(1);
var array: Array<Manga> | Response<any> = await Manga.search(
    offset_limits_,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    (new Order(
        undefined,
        Asc_Desc.asc()
    )),
    undefined,
    undefined,
    undefined
);
test_area.render(
        <div>
            <p>{JSON.stringify(array)}</p>
        </div>
    );
/*let offset_limits_1 : Offset_limits = new Offset_limits();
offset_limits_1.set_limits(2);
var arrays : Array<Chapter> | Response<any> = await array![0].getFeed(
    offset_limits_1,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    new Order(
        undefined,
        Asc_Desc.desc()
    )
)

test_area.render(
        <div>
            <p>{JSON.stringify(arrays)}</p>
        </div>
    );
*/
if(array instanceof Array<Manga>){
    test_area.render(
        <div>
            <Mangafeed src={array[0]}/>
        </div>
    );
}else{
    test_area.render(
        <div>
            <p>Error on loading feed</p>
        </div>
    );
}
