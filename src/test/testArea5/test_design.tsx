import React from "react";
import ReactDOM from "react-dom/client";
import * as Chakra from "@chakra-ui/react";
import { Manga } from "../../mangadex/api/structures/Manga";
import { ErrorELAsync } from "../../mangadex/resources/componnents/Error_cmp";
import { Await } from "react-router-dom";
import { MangaSimpleEl } from "./MangaSimpleEl";
import { useFormik } from 'formik';
import * as ChakraIcons from "@chakra-ui/icons";
import { Offset_limits } from "../../mangadex/api/internal/Utils";
const test_area = ReactDOM.createRoot(document.getElementById("test_area")!);

//const to_use = Manga.getMangaByID("a82fe527-9e74-48d0-9c5f-a5e788c0bd4a");

function TestNode(){
    const ref = React.createRef<HTMLDivElement>();

    const formik = useFormik({
    initialValues: {
        title : ""
    },
    onSubmit: values => {
        let result_root = ReactDOM.createRoot(ref.current!);
        let offset_limits_1 = new Offset_limits();
        let promise = Manga.search({
            offset_Limits: offset_limits_1,
            title : values.title
        });
        formik.setSubmitting(false);
        result_root.render(
            <Chakra.ChakraProvider>
                <React.Suspense
                    fallback={
                        <Chakra.Center>
                            <Chakra.Spinner
                                size={"xl"}
                            />
                        </Chakra.Center>
                    }
                >
                    <Await
                        resolve={promise}
                        errorElement={
                            <ErrorELAsync/>
                        }
                    >
                        {(getted : Array<Manga>) => {
                            return (
                                <Chakra.Box>
                                    {
                                        getted.map<React.ReactNode>(value => {
                                            return (<MangaSimpleEl src={value}/>);
                                        })
                                    }
                                </Chakra.Box>
                            )
                        }}
                    </Await>
                </React.Suspense>
            </Chakra.ChakraProvider>
        )
    }
})
    return (
        <Chakra.Box>
            <form
                onSubmit={formik.handleSubmit}
            >
                <Chakra.Stack
                    direction={"row"}
                    spacing={4}
                >
                    <Chakra.Input
                        placeholder="Search"
                        onChange={formik.handleChange}
                        name={"title"}
                        letiant='flushed'
                    />
                    <Chakra.IconButton
                        type="submit"
                        icon={<ChakraIcons.SearchIcon/>}
                        aria-label={"Search Title"}
                        isLoading={formik.isSubmitting}
                    />
                </Chakra.Stack>
            </form>
            <Chakra.Box
                ref={ref}
            >

            </Chakra.Box>
        </Chakra.Box>
    );
}



/*let arrays : Array<Chapter> | Response<any> = await array![0].getFeed(
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
"center -20em"
test_area.render(
    <Chakra.ChakraProvider>
        <TestNode/>
    </Chakra.ChakraProvider>
)