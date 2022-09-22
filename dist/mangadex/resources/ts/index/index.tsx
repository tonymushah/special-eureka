import { Api_Request } from '../../../api/internal/Api_Request';
import { Collection } from '../../../api/structures/Collection';
import { Manga } from "../../../api/structures/Manga";
import { manga_collection } from '../../../api/funcs/Collection.libs'
import { Response } from '@tauri-apps/api/http';
import React from 'react';
import ReactDOM from 'react-dom/client';
import El_Manga_simple2 from '../../../api/tsx/Manga2';
import El_Manga_simple from '../../../api/tsx/Manga';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Card from "react-bootstrap/Card";
import { CardGroup, Carousel } from 'react-bootstrap';
import MangaCarousel from '../../../api/tsx/MangaCarousel';

var to_attendant = ReactDOM.createRoot(document.getElementById("manga_container")!);
to_attendant.render(
    <div className='container'>
        <div className='row'>
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status"></div>
            </div>
        </div>
        <div className='row'>
            <div className="d-flex justify-content-center">
                <p id='loading-prct'>Loading...</p>
            </div>
            
        </div>
    </div>
);

try {
    to_attendant.render(
        <div className='container'>
            <div className='row'>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border"  role="status"></div>
                </div>
            </div>
            <div className='row'>
                <div className=" d-block justify-content-center">
                    <p id='loading-prct'>Execting scripts...</p>
                </div>
            </div>
        </div>
    );
    var req_result:Response<any> = await Api_Request.get_methods("manga");
    var collection:Collection = Collection.build_with_any(req_result.data);
    var mangaArray:Array<Manga> = manga_collection(collection);
    /*for (let index = 0; index < mangaArray.length; index++) {
        const element = mangaArray[index];
        const cover_toUse: string = (await element.get_cover_art()).get_CoverImage_thumbnail(256);
        const to_use = ReactDOM.hydrateRoot(
        document.getElementById("manga_container")!, 
        <div>
            <div className=''>
                {
                    React.createElement("img", {
                        src : cover_toUse,
                        alt : element.get_title().en
                    })
                }
            </div>
            <div>
                <p>{element.get_title().en}</p>
            </div>
        </div>
    );
    }*/
    var to_show: Array<any> = new Array<any>(mangaArray.length);
    
    for (let index = 0; index < mangaArray.length; index++) {
        const Manga_use = mangaArray[index];
        //var cover_image:string = (await Manga_use.get_cover_art()).get_CoverImage_thumbnail(256);
        to_show[index] = /*(
            <div className="container manga-simpleBOX">
                <div className="row">
                    <div className='col-md-3 col-lg-3'>
                            {
                                React.createElement(
                                    "img",
                                    {src : cover_image,
                                    class : "cover-image"}
                                )
                            }
                        
                    </div>
                    <div className='col-md-9 col-lg-9'>
                        <h3 className='manga-title'>{Manga_use.get_title().en}</h3>
                        <br/>
                        <p className='manga-description'>{Manga_use.get_description().en}</p>
                    </div>
                </div>
            </div>
        )*/ // await (new El_Manga_simple(Manga_use)).render();
        await (new MangaCarousel(Manga_use)).render();
        const to_modify = ReactDOM.createRoot(document.getElementById("loading-prct")!);
        to_modify.render(
            <div className='d-block'>
                <br />
                <p className='d-flex justify-content-center'>Getting Manga : {Manga_use.get_id()} ...</p>
                <ProgressBar now={(index / mangaArray.length) * 100} label={((index / mangaArray.length) * 100) + " %"}></ProgressBar>
            </div>
        )
    }
    const to_use = ReactDOM.createRoot(document.getElementById("manga_container")!);
    var lol1 = <div>
            <div className='d-flex container'>
                {to_show.slice(0, mangaArray.length / 2)}
            </div>
            <div className='d-flex container'>
                {to_show.slice(mangaArray.length / 2, mangaArray.length)}
            </div>
        </div>;
    var lol2 = <CardGroup>
        {to_show}
    </CardGroup>
    var lol3 = <Carousel className="align-content-center w-100">
        {to_show}
    </Carousel>
    to_use.render(
        <div className='container '>
            <div className='row'>
                {lol3}
            </div>
        </div>
    )
} catch (error) {
    var alert_ = document.createElement("div");
    alert_.setAttribute("class", "alert alert-danger");
    alert_.innerText = error;
    document.getElementById("error-box")?.appendChild(alert_);
    to_attendant.render(
    <p></p>
    );
}

