import { Box, Switch } from "@chakra-ui/react";
import useServerAutoStart from "@mangadex/resources/hooks/userOptions/RtlSidebar";

export default function RtlSidebarOption(){
    const {
        query,
        toggle
    } = useServerAutoStart();
    if(query.isSuccess){
        return(
            <Box
                onClick={() => {
                    toggle();
                }}
            >
                <Switch
                    isChecked={query.data}
                />
            </Box>
        );
    }
    return (
        <>Loading...</>
    );
}