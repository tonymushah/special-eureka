import React from "react";
import BasicTwoElement from "../Base";
import { Button } from "@chakra-ui/react";

const ServerButton = React.lazy(() => import("@mangadex/pages/download/ErrorBoundary/Bouttons/ServerButton"));

export default function ServerPart() {
    return (
        <BasicTwoElement title="Server State">
            <React.Suspense
                fallback={
                    <Button
                        isLoading
                        colorScheme={"blue"}
                    >
                        Loading...
                    </Button>
                }
            >
                <ServerButton />
            </React.Suspense>
        </BasicTwoElement>
    );
}