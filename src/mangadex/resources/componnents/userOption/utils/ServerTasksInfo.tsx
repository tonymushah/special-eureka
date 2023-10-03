import { Progress } from "@chakra-ui/react";
import useRunningTasks from "@mangadex/resources/hooks/MangaManagerState/useRunningTasks";
import useTasksLimit from "@mangadex/resources/hooks/MangaManagerState/useTasksLimit";

export default function ServerTasksInfo() {
    const running = useRunningTasks();
    const limit = useTasksLimit();
    if (running.isSuccess && limit.isSuccess) {
        return (
            <Progress 
                value={((running.data / limit.data) * 100)} 
                aria-valuemax={limit.data} 
                aria-valuemin={0} 
                aria-valuenow={running.data} 
            />
        );
    } else {
        return (
            <Progress isIndeterminate />
        );
    }
}