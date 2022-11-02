import { Response } from '@tauri-apps/api/http';
import React, { useState } from 'react';
import { Row, Spinner, Carousel } from 'react-bootstrap';
import ReactDOM from 'react-dom/client';
import { Await, useAsyncError, useAsyncValue, useLoaderData } from 'react-router-dom';
import { Manga } from '../api/structures/Manga';
import { ErrorELAsync } from '../resources/componnents/Error_cmp';
import * as Chakra from "@chakra-ui/react"
import { List } from '../api/structures/List';
import { Manga_swipper } from '../resources/componnents/mangas/Manga_State1';

function Home(props){
    const { loader1 } = useLoaderData();
    return (
        <>
            <Row className='d-block'>
                <React.Suspense 
                  fallback={
                    <Chakra.AbsoluteCenter>
                      <Chakra.Spinner 
                        size="xl"
                        color='orange.500'
                        thickness='4px'
                      />
                    </Chakra.AbsoluteCenter>
                  }
                >
                    <Await 
                        resolve={loader1}
                        errorElement={<ErrorELAsync/>}
                    >
                      {(gettedList : List) => {
                        return (
                          <Chakra.Box>
                            <Chakra.Heading>Seasonal</Chakra.Heading>
                            <React.Suspense
                              fallback={
                                <Chakra.AbsoluteCenter>
                                  <Chakra.Spinner 
                                    size="xl"
                                    color='orange.500'
                                    thickness='4px'
                                  />
                                </Chakra.AbsoluteCenter>
                              }
                            >
                              <Await
                                resolve={gettedList.build_and_get_mangaArray()}
                                errorElement={<ErrorELAsync></ErrorELAsync>}
                              >
                                {(gettedArray : Array<Manga>) => {
                                  return (<Manga_swipper src={gettedArray}></Manga_swipper>)
                                }}
                              </Await>
                            </React.Suspense>
                          </Chakra.Box>
                        )
                      }}
                    </Await>
                </React.Suspense>
            </Row>
        </>
    );
}
export default Home;

