import { Response } from '@tauri-apps/api/http';
import React, { useState } from 'react';
import { Row, Spinner, Carousel, Container, Col } from 'react-bootstrap';
import ReactDOM from 'react-dom/client';
import { Await, useAsyncError, useAsyncValue, useLoaderData } from 'react-router-dom';
import { Manga } from '../api/structures/Manga';
import { ErrorELAsync } from '../resources/componnents/Error_cmp';
import * as Chakra from "@chakra-ui/react"
import { List } from '../api/structures/List';
import { Manga_swipper } from '../resources/componnents/mangas/Manga_State1';
import { Asc_Desc, Offset_limits, Order } from '../api/internal/Utils';
import { Manga_WithLatest_Chap_01 } from '../resources/componnents/mangas/Mangafeed';

function Home(props){
    let offset_limits_1 : Offset_limits = new Offset_limits();
    offset_limits_1.set_limits(20);
    return (
        <Container>
            <Row className='d-block'>
                <React.Suspense 
                  fallback={
                    <Chakra.Center>
                      <Chakra.Spinner 
                        size="xl"
                        color='orange.500'
                        thickness='4px'
                      />
                    </Chakra.Center>
                  }
                >
                    <Await 
                        resolve={List.getListByID("4be9338a-3402-4f98-b467-43fb56663927")}
                        errorElement={<ErrorELAsync/>}
                    >
                      {(gettedList : List) => {
                        return (
                          <Chakra.Box>
                            <Chakra.Heading>Seasonal</Chakra.Heading>
                            <React.Suspense
                              fallback={
                                <Chakra.Center>
                                  <Chakra.Spinner 
                                    size="xl"
                                    color='orange.500'
                                    thickness='4px'
                                  />
                                </Chakra.Center>
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
            <Chakra.Divider/>
            <Row>
                <React.Suspense 
                  fallback={
                    <Chakra.Center>
                      <Chakra.Spinner 
                        size="xl"
                        color='orange.500'
                        thickness='4px'
                      />
                    </Chakra.Center>
                  }
                >
                    <Await 
                        resolve={Manga.search({
                          offset_Limits : offset_limits_1,
                          order : (new Order(
                            undefined, 
                            //undefined,
                            Asc_Desc.desc(),
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            Asc_Desc.desc()
                          )),
                          hasAvailableChapters : true
                        })}
                        errorElement={<ErrorELAsync/>}
                    >
                      {(getted : Array<Manga>) => {
                        let returns : Array<React.ReactNode> = new Array<React.ReactNode>(getted.length);
                        for (let index = 0; index < returns.length; index++) {
                          returns[index] = (
                            <Manga_WithLatest_Chap_01 src={getted[index]}/>
                          );
                        }
                        return (
                          <Chakra.Box>
                            <Chakra.Heading>Latest Updates</Chakra.Heading>
                            <Chakra.Box>
                              <Container>
                                <Row>
                                  <Col>
                                      {returns.slice(0, returns.length / 2)}
                                  </Col>
                                  <Col>
                                      {returns.slice(returns.length / 2)}
                                  </Col>
                                </Row>
                              </Container>
                            </Chakra.Box>
                          </Chakra.Box>
                        )
                      }}
                    </Await>
                </React.Suspense>
            </Row>
        </Container>
    );
}
export default Home;

