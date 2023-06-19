import { Button } from "@chakra-ui/react";
import { getDashboardPath } from "../../index";
import { Link } from "react-router-dom";
import { TauriCheckUpdateQuery } from "../hooks/UpdaterQuery";

const dashboardPath = getDashboardPath();

export default function Tauri_Updater(props: {
    withoutToast?: boolean
}){
    const {query} = TauriCheckUpdateQuery(props);
    if(query.isSuccess == true && query.data.shouldUpdate == true){
        return (
            <Button
            as={Link}
            colorScheme={"facebook"}
            to={dashboardPath + "/update-latest"}
            isLoading={query.isLoading}
        >
            Update avalaible
        </Button>
        );
    }
    return (
        <Button
            colorScheme={"facebook"}
            isLoading={query.isLoading}
            onClick={() => {
                query.refetch();
            }}
        >
            Check for updates
        </Button>
    );
}
