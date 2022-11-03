import { message } from '@tauri-apps/api/dialog';
import React from "react";
import ReactDOM from "react-dom/client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Manga_swipper2 } from "../../mangadex/resources/componnents/mangas/Manga_State2"
import { ChakraProvider, AbsoluteCenter, Spinner, Box } from '@chakra-ui/react';
import { Await } from 'react-router-dom';
import { Manga } from '../../mangadex/api/structures/Manga';
import { Asc_Desc, Offset_limits, Order } from '../../mangadex/api/internal/Utils';
import { Response } from '@tauri-apps/api/http';
import { ErrorELAsync } from '../../mangadex/resources/componnents/Error_cmp';
var orders = new Order();
orders.set_createdAt(Asc_Desc.desc());
var orffet_limits = new Offset_limits();
orffet_limits.set_limits(25);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <Box>
      <React.Suspense
        fallback={
          <AbsoluteCenter>
            <Spinner 
              size={"lg"}
            />
          </AbsoluteCenter>
        }
      >
        <Await
          resolve={
              
              Manga.search(
                {
                  offset_Limits : orffet_limits,
                  order : orders
                }
              )
            
          }
          errorElement={
            <ErrorELAsync></ErrorELAsync>
          }
        >
          {
            (getted : Array<Manga>) => {
              return (
                <Manga_swipper2 src={getted}></Manga_swipper2>
              )
            }
          }
          
        </Await>
      </React.Suspense>
    </Box>
  </ChakraProvider>
);