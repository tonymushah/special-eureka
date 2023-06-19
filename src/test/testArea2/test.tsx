import { message } from "@tauri-apps/api/dialog";
import React from "react";
import ReactDOM from "react-dom/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Manga_swipper2 } from "../../mangadex/resources/componnents/mangas/Manga_State2";
import { ChakraProvider, AbsoluteCenter, Spinner, Box, Text, Heading } from "@chakra-ui/react";
import { Await, createBrowserRouter, createRoutesFromElements, Link, Outlet, Route, RouterProvider } from "react-router-dom";
import { Manga } from "../../mangadex/api/structures/Manga";
import { Asc_Desc, Offset_limits, Order } from "../../mangadex/api/internal/Utils";
import { Response, ResponseType } from "@tauri-apps/api/http";
import { ErrorELAsync, ErrorELRouter } from "../../mangadex/resources/componnents/Error_cmp";
import About from "./About/About";
import Overview from "./About/index";
import Me from "./About/Me";

const test2Path  = "/test/testArea2";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={test2Path}
      element={
        <Box>
          <Box>
            <Link to={test2Path}>Home</Link>
            &nbsp;
            <Link to="about">About</Link>
          </Box>
          <Box>
            <Outlet/>
          </Box>
        </Box>
      }
      errorElement={<ErrorELRouter/>}
    >
      <Route
        index
        element={
          <Box>
            <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius quo, eum veniam commodi nihil eos quidem possimus ad, culpa dolores velit excepturi temporibus laboriosam soluta ipsam veritatis? Voluptatem, non? Similique.</Text>
          </Box>
        }
        errorElement={<ErrorELRouter/>}
      >
      </Route>
      <Route
        path="about"
        element={
          <About/>
        }
        errorElement={<ErrorELRouter/>}
      >
        <Route
          index
          element={
            <Overview/>
          }
          errorElement={<ErrorELRouter/>}
        >

        </Route>
        <Route
          path="me"
          element={
            <Me/>
          }
          errorElement={<ErrorELRouter/>}
        >
        </Route>
        <Route
          path="others"
          element={
            <>
              <Text>About others</Text>
              <Text>i don't know</Text>
            </>
          }
          errorElement={<ErrorELRouter/>}
        >

        </Route>
      </Route>

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <RouterProvider 
      router={router}
    />
  </ChakraProvider>
);