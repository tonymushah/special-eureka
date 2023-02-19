import * as Chakra from "@chakra-ui/react";
import React from 'react';
import { Row } from 'react-bootstrap';
import { useQuery } from "react-query";
import { Mangadex_suspense } from "../..";
import { useHTTPClient } from "../../../commons-res/components/HTTPClientProvider";
import { Offset_limits } from '../../api/internal/Utils';
import { getVersion } from '@tauri-apps/api/app';

const Seasonal = React.lazy(() => import("./Seasonal"));
const Latest_Updates = React.lazy(() => import("./Latest_Update"));
const IsPingable = React.lazy(() => import("../../resources/componnents/IsPingable"));
const IsPingable_defaultError = React.lazy(() => import("../../resources/componnents/IsPingable_defaultError"));
const RecentlyAdded = React.lazy(() => import("./RecentlyAdded"));

function Home() {
  let offset_limits_1: Offset_limits = new Offset_limits();
  offset_limits_1.set_limits(20);

  const client = useHTTPClient();
  const app_version_query = useQuery("special-eureka-version", () => {
    return getVersion();
  }, {
    staleTime: Infinity
  })
  return (
    <Chakra.Box
      margin={2}
    >
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
            Welcome to Mangadex Desktop {
              app_version_query.isSuccess ? (
                <span>{app_version_query.data}</span>
              ) : (
                <Chakra.Skeleton width={"10px"} height={"10px"} />
              )
            }
          </Chakra.AlertTitle>
          <Chakra.AlertDescription
            maxWidth='sm'
          >
            NOTE : This version of the app is still in <Chakra.Highlight query='spot' styles={{ py: '1', fontWeight: "bold" }}> ALPHA </Chakra.Highlight>.
            Bugs and performances issues are excepted
          </Chakra.AlertDescription>
        </Chakra.Alert>
      </Row>
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
                  <Seasonal/>
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

