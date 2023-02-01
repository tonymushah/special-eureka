import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import { useQuery } from "@chakra-ui/react";
import { useFormik } from 'formik';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { Await } from 'react-router-dom';
import { useHTTPClient } from "../../../../commons-res/components/HTTPClientProvider";
import { Offset_limits } from '../../../api/internal/Utils';
import { Collection } from '../../../api/structures/Collection';
import { Manga } from '../../../api/structures/Manga';
import MangaSearchType from "../../../api/structures/SearchType/Manga";
import { ErrorELAsync1 } from '../Error_cmp';
import IsPingable from "../IsPingable";
import MangaElementFallback from '../mangas/v1/MangaElementFallback';

type Modal_SearchProps = {
    show: boolean,
    onHide: () => void
}

const MangaElementDef = React.lazy(() => import('../mangas/v1/MangaElementDef'));

export default function Modal_Search(props: Modal_SearchProps) {
    const client = useHTTPClient();
    const [result, setResult] = React.useState(<></>);
    const build = (array: Array<Manga>) => {
        let builded: Array<React.ReactNode> = [];
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            builded[index] = (
                <React.Suspense
                    fallback={<MangaElementFallback />}
                >
                    <MangaElementDef src={element} />
                </React.Suspense>
            )
        }
        return builded;
    }
    const formik = useFormik({
        initialValues: {
            title: ""
        },
        onSubmit: values => {
            setResult(<></>)
            let offset_limits_1 = new Offset_limits();
            let promise = Manga.search({
                offset_Limits: offset_limits_1,
                title: values.title,
                client: client
            });
            formik.setSubmitting(false);
            setResult(
                <IsPingable
                    client={client}
                    onError={
                        (query) => (
                            <Chakra.Alert>
                                <Chakra.AlertIcon />
                                <Chakra.AlertTitle>Can't access to MangaDex website</Chakra.AlertTitle>
                                <Chakra.AlertDescription>
                                    <Chakra.Button
                                        colorScheme={"orange"}
                                        onClick={() => query.refetch()}
                                    >Refresh</Chakra.Button>
                                </Chakra.AlertDescription>
                            </Chakra.Alert>
                        )
                    }
                    onSuccess={() => (
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
                                    <ErrorELAsync1 />
                                }
                            >
                                {(getted0: Collection<Manga>) => {
                                    return (
                                        <Chakra.Box>
                                            {
                                                build(getted0.get_data())
                                            }
                                        </Chakra.Box>
                                    )
                                }}
                            </Await>
                        </React.Suspense>
                    )}
                    onLoading={
                        <Chakra.Center>
                            <Chakra.Spinner
                                size={"xl"}
                            />
                        </Chakra.Center>
                    }
                />
            )
        }
    })
    return (
        <Modal show={props.show} onHide={props.onHide} className={" w-100"}>
            <Modal.Header closeButton>
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
                                variant='flushed'
                            />
                            <Chakra.IconButton
                                type="submit"
                                icon={<ChakraIcons.SearchIcon />}
                                aria-label={"Search Title"}
                                isLoading={formik.isSubmitting}
                            />
                        </Chakra.Stack>
                    </form>
                </Chakra.Box>
            </Modal.Header>
            <Modal.Body>
                <Chakra.Box
                >
                    {result}
                </Chakra.Box>
            </Modal.Body>
        </Modal>
    );
}