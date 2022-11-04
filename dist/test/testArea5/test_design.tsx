import React from "react";
import ReactDOM from "react-dom/client";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import { Mangafeed, Manga_WithLatest_Chap_0, Manga_WithLatest_Chap_01, Manga_WithLatest_Chap_1, Manga_WithLatest_Chap_11 } from "./Mangafeed";
import { Manga } from "../../mangadex/api/structures/Manga";
import { Asc_Desc, Offset_limits, Order, Querry_list_builder } from "../../mangadex/api/internal/Utils";
import { List } from "../../mangadex/api/structures/List";
import { Cover } from "../../mangadex/api/structures/Cover";
import { Alt_title } from '../../mangadex/api/internal/Utils';
import { Await } from "react-router-dom";
import { Api_Request } from "../../mangadex/api/internal/Api_Request";
import { Response, getClient } from "@tauri-apps/api/http";
import { Chapter } from "../../mangadex/api/structures/Chapter";
import { Chapter_ } from "../../mangadex/resources/componnents/chapters/Chapter_";
import { ChakraProvider , Box } from "@chakra-ui/react";
import { ErrorELAsync } from "../../mangadex/resources/componnents/Error_cmp";
import { Container, Row, Col } from "react-bootstrap";
import axios from 'axios';
import axiosTauriAdapter from 'axios-tauri-adapter';

const test_area = ReactDOM.createRoot(document.getElementById("test_area")!);

let offset_limits_1 : Offset_limits = new Offset_limits();
offset_limits_1.set_limits(26);
/*var arrays : Array<Chapter> | Response<any> = await array![0].getFeed(
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
)*/

test_area.render(
    <ChakraProvider>
        <React.Suspense
            fallback={
                <div>
                    <p>Loading...</p>
                </div>
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
                    )
                }}
            </Await>
        </React.Suspense>
            <Box>
            </Box>
    </ChakraProvider>
)