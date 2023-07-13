import { Card, CardBody } from "@chakra-ui/react";
import React from "react";

export function ReallySimpleCard({ children }: React.PropsWithChildren) {
    return (
        <Card>
            <CardBody>
                {children}
            </CardBody>
        </Card>
    );
}
