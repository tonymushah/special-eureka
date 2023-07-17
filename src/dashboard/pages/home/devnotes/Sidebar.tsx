import {
    Collapse, Image, Table, TableCaption,
    TableContainer, Tag, Tbody, Td, Thead, Tr, useDisclosure
} from "@chakra-ui/react";
import React from "react";
import SidebarV014 from "@dashboard/resources/screenshoots/0.1.4/Sidebar.png";
import SidebarV015 from "@dashboard/resources/screenshoots/0.1.5/Sidebar.png";

export default function Sidebar(){
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
                                    src={SidebarV014}
                                />
                            </Td>
                            <Td>
                                <Image
                                    src={SidebarV015}
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