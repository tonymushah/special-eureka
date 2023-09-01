export default function handleRouteError(error: unknown){
    if(error instanceof Response || error instanceof Error){
        throw error;
    }else if(typeof error == "string") {
        return new Response(error, {
            status : 500,
            statusText : "Loader Error",
            headers : {
                "content-type" : "text/plain"
            }
        });
    }else{
        return new Response(JSON.stringify(error), {
            "status" : 500,
            "statusText" : "Loader Error"
        });
    }
}