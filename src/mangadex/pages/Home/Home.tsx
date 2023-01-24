import * as Chakra from "@chakra-ui/react";
import React from 'react';
import { Row } from 'react-bootstrap';
import { useHTTPClient } from "../../../commons-res/components/HTTPClientProvider";
import { Offset_limits } from '../../api/internal/Utils';

const CustomListSwiper = React.lazy(() => import('../../resources/componnents/lists/v1/CustomListSwiper'));
const Latest_Updates = React.lazy(() => import("./Latest_Update"));

function Home(){
    let offset_limits_1 : Offset_limits = new Offset_limits();
    offset_limits_1.set_limits(20);
    const id_toUse = "4be9338a-3402-4f98-b467-43fb56663927";
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
              <Chakra.Box>
                <Chakra.Heading>Seasonal</Chakra.Heading>
                <React.Suspense
                  fallback={<Chakra.Box >
                    <Chakra.Center>
                      <Chakra.Spinner
                        size={"xl"}
                      />
                    </Chakra.Center>
                  </Chakra.Box>}
                >
                  <CustomListSwiper listID={id_toUse}/>
                </React.Suspense>
              </Chakra.Box>
            </Row>
            <Chakra.Divider/>
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
                <Latest_Updates/>
              </React.Suspense>
            </Row>
        </Chakra.Box>
    );
}
export default Home;

