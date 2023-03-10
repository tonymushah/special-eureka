import * as Chakra from "@chakra-ui/react";
import React from 'react';
import { Row } from 'react-bootstrap';
import { Mangadex_suspense } from "../..";
import { useHTTPClient } from "../../../commons-res/components/HTTPClientProvider";
import { Offset_limits } from '../../api/internal/Utils';
import { appWindow } from "@tauri-apps/api/window";

const Seasonal = React.lazy(() => import("./Seasonal"));
const Latest_Updates = React.lazy(() => import("./Latest_Update"));
const IsPingable = React.lazy(() => import("../../resources/componnents/IsPingable"));
const IsPingable_defaultError = React.lazy(() => import("../../resources/componnents/IsPingable_defaultError"));
const RecentlyAdded = React.lazy(() => import("./RecentlyAdded"));
const PopularRecently = React.lazy(() => import("./PopularTitles"));

function Home() {
    let offset_limits_1: Offset_limits = new Offset_limits();
    offset_limits_1.set_limits(20);
    const client = useHTTPClient();
    appWindow.setTitle("High Quality Image, no ads | Mangadex");
    return (
        <Chakra.Box
            margin={2}
        >
            <React.Suspense
                fallback={
                    <Chakra.AbsoluteCenter>
                        <Chakra.Spinner
                            size={"lg"}
                        />
                    </Chakra.AbsoluteCenter>
                }
            >
                <IsPingable
                    client={client}
                    onError={(query) => (
                        <Mangadex_suspense>
                            <IsPingable_defaultError
                                query={query}
                            />
                        </Mangadex_suspense>
                    )}
                    onLoading={
                        <Chakra.AbsoluteCenter>
                            <Chakra.Spinner
                                size={"lg"}
                            />
                        </Chakra.AbsoluteCenter>
                    }
                    onSuccess={() => (
                        <React.Fragment>
                            <Row className='d-block'>
                                <React.Suspense
                                    fallback={<Chakra.Box >
                                        <Chakra.Center>
                                            <Chakra.Spinner
                                                size={"xl"}
                                            />
                                        </Chakra.Center>
                                    </Chakra.Box>}
                                >
                                    <PopularRecently/>
                                </React.Suspense>
                                <React.Suspense
                                    fallback={<Chakra.Box >
                                        <Chakra.Center>
                                            <Chakra.Spinner
                                                size={"xl"}
                                            />
                                        </Chakra.Center>
                                    </Chakra.Box>}
                                >
                                    <Seasonal />
                                </React.Suspense>
                            </Row>
                            <Chakra.Divider />
                            <Row
                                className='d-block'
                            >
                                <React.Suspense
                                    fallback={<Chakra.Box >
                                        <Chakra.Center>
                                            <Chakra.Spinner
                                                size={"xl"}
                                            />
                                        </Chakra.Center>
                                    </Chakra.Box>}
                                >
                                    <Latest_Updates />
                                </React.Suspense>
                            </Row>
                            <Row
                                className='d-block'
                            >
                                <React.Suspense
                                    fallback={<Chakra.Box >
                                        <Chakra.Center>
                                            <Chakra.Spinner
                                                size={"xl"}
                                            />
                                        </Chakra.Center>
                                    </Chakra.Box>}
                                >
                                    <RecentlyAdded />
                                </React.Suspense>
                            </Row>
                        </React.Fragment>
                    )}
                />
            </React.Suspense>
        </Chakra.Box>

    );
}
export default Home;

