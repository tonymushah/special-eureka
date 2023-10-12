import { useAsyncError } from "react-router";
import ShowUnknownError from "../router/error/ShowUnknownError";


export function ErrorELAsync1() {
    const error = useAsyncError();
    return (
        <ShowUnknownError error={error} />
    );
}
