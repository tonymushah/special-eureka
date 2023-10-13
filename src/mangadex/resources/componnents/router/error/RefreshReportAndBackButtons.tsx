import * as Chakra from "@chakra-ui/react";
import GoBackButton from "./RefreshAndBackButtons/GoBackButton";
import RefreshButton from "./RefreshAndBackButtons/RefreshButton";
import ReportButton from "./RefreshAndBackButtons/ReportButton";


export default function RefreshReportAndBackButtons({ error }: {
    error: Error;
}) {
    return (
        <Chakra.ButtonGroup>
            <GoBackButton />
            <ReportButton error={error} />
            <RefreshButton />
        </Chakra.ButtonGroup>
    );
}
