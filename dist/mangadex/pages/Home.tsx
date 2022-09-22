import { Response } from '@tauri-apps/api/http';
import React, { useState } from 'react';
import { Row, Spinner, Carousel } from 'react-bootstrap';
import ReactDOM from 'react-dom/client';
import { Await, useAsyncError, useAsyncValue, useLoaderData } from 'react-router-dom';
import { Manga } from '../api/structures/Manga';
import MangaList from '../api/tsx/MangaList';
import { Error_cmp } from '../resources/componnents/Error_cmp';
import ReactJson from 'react-json-view';
import { Manga1 } from '../resources/componnents/Manga1';
//import { MangaCarrousel } from '../resources/componnents/MangaLists';

function Homep1(props): React.ReactNode{
    //let mangaArray: Array<Manga> = props.mangaData;
    return (
        <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/commons-res/Loading.svg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/commons-res/Loading.svg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/commons-res/Loading.svg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    );
}
function Home(props): React.ReactNode{
    const { loader1 } = useLoaderData();
    return (
        <>
            <Row className='d-block'>
                <React.Suspense >
                    <Await 
                        resolve={loader1}
                        errorElement={<Errord/>}
                        children={(getted) => {
                            if(getted instanceof Array<Manga>){
                                return ( <Homep1 mangaData={getted}/>);
                            }else{
                                return ( <Error_cmp error={JSON.stringify(getted.data)}/> )
                            }

                        }}
                    />
                </React.Suspense>
            </Row>
            <Row>
                <p>lol</p>
            </Row>
        </>
    );
}
function Errord(props): React.ReactNode{
    let errors = JSON.stringify(useAsyncError());
    return (
        <Error_cmp error={errors}/>
    )
}
export default Home;

