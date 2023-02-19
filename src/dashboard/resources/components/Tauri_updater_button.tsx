import { Button } from "@chakra-ui/react";
import { TauriCheckUpdateQuery } from "../hooks/UpdaterQuery";

export default function Tauri_Updater(){
    const {query} = TauriCheckUpdateQuery();
    return (
        <Button
            colorScheme={"facebook"}
            isLoading={query.isLoading}
            onClick={() => {
                query.refetch()
            }}
        >
            Check for updates
        </Button>
    )
}
