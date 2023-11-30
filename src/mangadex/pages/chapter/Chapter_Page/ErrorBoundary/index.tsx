import RouteErrorBoundary from "@mangadex/resources/componnents/router/error/Boundary";
import { isRouteErrorResponse, useRouteError } from "react-router";
import { ShowMissingImagesError } from "./ShowMissingImagesError";

export default function ErrorBoundary() {
    const error = useRouteError();
    if (isRouteErrorResponse(error) && error.status == 403) {
        return (
            <ShowMissingImagesError error={error} />
        );
    } else {
        return (
            <RouteErrorBoundary />
        );
    }
}