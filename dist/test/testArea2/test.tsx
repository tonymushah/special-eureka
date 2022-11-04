import { message } from '@tauri-apps/api/dialog';
import React from "react";
import ReactDOM from "react-dom/client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Manga_swipper2 } from "../../mangadex/resources/componnents/mangas/Manga_State2"
import { ChakraProvider, AbsoluteCenter, Spinner, Box, Text } from '@chakra-ui/react';
import { Await } from 'react-router-dom';
import { Manga } from '../../mangadex/api/structures/Manga';
import { Asc_Desc, Offset_limits, Order } from '../../mangadex/api/internal/Utils';
import { Response, ResponseType } from '@tauri-apps/api/http';
import { ErrorELAsync } from '../../mangadex/resources/componnents/Error_cmp';
import { getClient } from "@tauri-apps/api/http"
import { Message, Reader } from "protobufjs"
const client = await getClient();
var data : Response<Uint8Array> = await client.get<Uint8Array>("https://jumpg-webapi.tokyo-cdn.com/api/title_list/all", {
  responseType : ResponseType.Binary
})
//console.log((data.data).toString())
try {
  var data_ = new Reader(data.data);
  var datas : Message = (Message).decodeDelimited(data_!);
  console.log("finished decoding")
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <>{datas.$type.fullName}</>
  )
} catch (error : any) {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <>
      <p>{error.message}</p>
      <p>{error.stack}</p>
    </>
  )
}


/*ReactDOM.createRoot(document.getElementById("root")!).render(
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
);*/