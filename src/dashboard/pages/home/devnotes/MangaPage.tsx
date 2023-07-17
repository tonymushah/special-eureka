import {
    Collapse, Image, Table, TableCaption,
    TableContainer, Tag, Tbody, Td, Thead, Tr, useDisclosure
} from "@chakra-ui/react";
import MangaPageV014_1 from "@dashboard/resources/screenshoots/0.1.4/MangaPage (2).png";
import MangaPageV014_2 from "@dashboard/resources/screenshoots/0.1.4/MangaPage.png";
import MangaPageV015_1 from "@dashboard/resources/screenshoots/0.1.5/MangaPage.png";
import MangaPageV015_2 from "@dashboard/resources/screenshoots/0.1.5/MangaPageChapter.png";
import React from "react";

export default function MangaPageChanges(){
    const { isOpen, onToggle } = useDisclosure();
    return (
        <React.Fragment>
            <Collapse in={isOpen} animateOpacity>
                <TableContainer>
                <Table variant="simple">
                    <TableCaption>0.1.4 and 0.1.5 MangaPage comparaison</TableCaption>
                    <Thead>
                        <Tr>
                            <Td>0.1.4</Td>
                            <Td>0.1.5</Td>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>
                                <Image
                                    src={MangaPageV014_1}
                                />
                            </Td>
                            <Td>
                                <Image
                                    src={MangaPageV015_1}
                                />
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>
                                <Image
                                    src={MangaPageV014_2}
                                />
                            </Td>
                            <Td>
                                <Image
                                    src={MangaPageV015_2}
                                />
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
            </Collapse>
            <Tag onClick={onToggle}>Comparaisons...</Tag>
        </React.Fragment>
    );
}