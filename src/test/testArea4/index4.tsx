import React, { Suspense, useCallback } from "react"
import { Carousel, Row, Spinner } from "react-bootstrap";
import ReactDOM from 'react-dom/client';
import { Await } from "react-router-dom";
import { Asc_Desc, Offset_limits, Order } from "../../mangadex/api/internal/Utils";
import { Manga } from "../../mangadex/api/structures/Manga";
import { Cards_list, Cards_list2} from "../../mangadex/resources/componnents/MangaLists";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import { Chapter } from "../../mangadex/api/structures/Chapter";
import { Chapter_ } from "../../mangadex/resources/componnents/chapters/Chapter_";

TimeAgo.addLocale(en);

function Chaps(props): React.ReactNode{
    let arrayChap: Array<Chapter> = props.to_use;
    var arrayNode: Array<React.ReactNode> = new Array<React.ReactNode>(arrayChap.length);
    for (let index = 0; index < arrayNode.length; index++) {
        const element = arrayChap[index];
        arrayNode[index] = (<Chapter_ chapter={element}/>);
    }
    return (<>{arrayNode}</>)
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.Suspense fallback={<Spinner size="lg" animation="border"/>}>
        <Await
            resolve={Chapter.search({
                offset_limits : new Offset_limits()
            })}
            errorElement={<p className="hidden">Errors</p>}
            children={(getted : Array<Chapter>) => {
                    return (<Chaps to_use={getted}/>);
                //</Chapter>return (<p>{JSON.stringify(getted)}</p>)
            }}
        />
    </React.Suspense>
);