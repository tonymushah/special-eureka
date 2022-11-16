import { Response } from '@tauri-apps/api/http';
import React, { useState } from 'react';
import { Row, Spinner, Carousel, Container, Col, Alert } from 'react-bootstrap';
import ReactDOM from 'react-dom/client';
import { Await, useAsyncError, useAsyncValue, useLoaderData } from 'react-router-dom';
import { Manga } from '../api/structures/Manga';
import { ErrorELAsync } from '../resources/componnents/Error_cmp';
import * as Chakra from "@chakra-ui/react"
import { List } from '../api/structures/List';
import { Manga_swipper } from '../resources/componnents/mangas/Manga_State1';
import { Asc_Desc, Offset_limits, Order } from '../api/internal/Utils';
import { Manga_WithLatest_Chap_01 } from '../resources/componnents/mangas/Mangafeed';
import { Manga_swipper2 } from '../resources/componnents/mangas/Manga_State2';

function Home(props){
    let offset_limits_1 : Offset_limits = new Offset_limits();
    offset_limits_1.set_limits(20);
    let offset_limits_2 : Offset_limits = new Offset_limits();
    offset_limits_2.set_limits(30);
    return (
        <Container>
            <Row 
              className=" d-block"
            >
              <Chakra.Alert 
                status={"info"} 
                variant={"top-accent"}
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                height='200px'  
              >
                <Chakra.AlertIcon
                  boxSize='40px' 
                  mr={0}   
                />
                <Chakra.AlertTitle
                  mt={4} 
                  mb={1} 
                  fontSize='lg'  
                >
                  Welcome to Mangadex Desktop v0.1.0
                </Chakra.AlertTitle>
                <Chakra.AlertDescription
                  maxWidth='sm'
                >
                  NOTE : This version of the app is still in <Chakra.Highlight query='spot' styles={{ py: '1', fontWeight: "bold" }}> ALPHA </Chakra.Highlight>. 
                  Bugs and performances issues are excepted
                </Chakra.AlertDescription>
              </Chakra.Alert>
            </Row>
            <Row className='d-block'>
                <React.Suspense 
                  fallback={
                    <Chakra.Box
                      marginTop={"25px"}
                      marginBottom={"25px"}
                    >
                      <Chakra.Center>
                        <Chakra.Spinner 
                          size="xl"
                          color='orange.500'
                          thickness='4px'
                        />
                      </Chakra.Center>
                    </Chakra.Box>
                  }
                >
                    <Await 
                        resolve={List.getListByID_includes_manga("4be9338a-3402-4f98-b467-43fb56663927")}
                        errorElement={<ErrorELAsync/>}
                    >
                      {(gettedList : List) => {
                        return (
                          <Chakra.Box>
                            <Chakra.Heading>Seasonal</Chakra.Heading>
                            <Manga_swipper src={gettedList.get_manga_array()}/>
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
                    <Chakra.Box
                      marginTop={"25px"}
                      marginBottom={"25px"}
                    >
                      <Chakra.Center>
                        <Chakra.Spinner 
                          size="xl"
                          color='orange.500'
                          thickness='4px'
                        />
                      </Chakra.Center>
                    </Chakra.Box>
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
            <Chakra.Divider/>
            <Row>
              <React.Suspense 
                  fallback={
                    <Chakra.Box
                      marginTop={"25px"}
                      marginBottom={"25px"}
                    >
                      <Chakra.Center>
                        <Chakra.Spinner 
                          size="xl"
                          color='orange.500'
                          thickness='4px'
                        />
                      </Chakra.Center>
                    </Chakra.Box>
                  }
                >
                    <Await 
                        resolve={Manga.search({
                          offset_Limits : offset_limits_2,
                          order : (new Order(
                            Asc_Desc.desc()))
                        })}
                        errorElement={<ErrorELAsync/>}
                    >
                      {(getted : Array<Manga>) => {
                        return (
                          <Chakra.Box>
                            <Chakra.Heading>Recently Added</Chakra.Heading>
                            <Chakra.Box>
                              <Container>
                                <Row>
                                  <Col>
                                    <Manga_swipper2 src={getted}/>
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

