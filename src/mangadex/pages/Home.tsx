import * as Chakra from "@chakra-ui/react";
import React from 'react';
import { Row } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { Offset_limits, Order } from '../api/internal/Utils';
import { Chapter, Chapter_withAllIncludes } from '../api/structures/Chapter';
import { Collection } from '../api/structures/Collection';
import MangaFeedElement from '../resources/componnents/chapter/v1/MangaFeedElement';
import ErrorEL1 from '../resources/componnents/error/ErrorEL1';
import CustomListSwiper from '../resources/componnents/lists/v1/CustomListSwiper';

function Latest_Updates(){
  const offset_limits_2 : Offset_limits = new Offset_limits();
  offset_limits_2.set_limits(12);
  const key = "mdx-home_page-latest_update";
  const query = useQuery<Collection<Chapter_withAllIncludes>>(key, () => {
    return Chapter_withAllIncludes.search({
      offset_limits: offset_limits_2,
      order: new Order("desc")
    })
  }, {
    staleTime : Infinity
  })
  if(query.isLoading){
    return (
      <Chakra.Box>
        <Chakra.Heading>Latest Updates</Chakra.Heading>
        <Chakra.Button
          colorScheme={"orange"}
          onClick={() => query.refetch()}
        >
          Refetch
        </Chakra.Button>
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
      </Chakra.Box>
    )
  }
  if(query.isError){
    return (
      <Chakra.Box>
        <Chakra.Heading>Latest Updates</Chakra.Heading>
        <Chakra.Button
          colorScheme={"orange"}
          onClick={() => query.refetch()}
        >
          Refetch
        </Chakra.Button>
        <ErrorEL1 error={query.data}/>
      </Chakra.Box>
    )
  }
  return (
    <Chakra.Box>
      <Chakra.Heading>Latest Updates</Chakra.Heading>
        <Chakra.Button
          colorScheme={"orange"}
          onClick={() => query.refetch()}
        >
          Refetch
        </Chakra.Button>
        <Chakra.Wrap>
          {query.data!.get_data().map((value : Chapter) => (
            <Chakra.WrapItem>
              <MangaFeedElement src={value}/>
            </Chakra.WrapItem>
          ))}
        </Chakra.Wrap>
    </Chakra.Box>
  )
}

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
                <CustomListSwiper listID={id_toUse}/>
              </Chakra.Box>
            </Row>
            <Chakra.Divider/>
            <Row
              className='d-block'
            >
              <Latest_Updates/>
            </Row>
        </Chakra.Box>
    );
}
export default Home;

