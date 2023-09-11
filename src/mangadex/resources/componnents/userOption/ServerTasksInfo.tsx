import { Progress } from "@chakra-ui/react";
import useRunningTasks from "@mangadex/resources/hooks/MangaManagerState/useRunningTasks";
import useTasksLimit from "@mangadex/resources/hooks/MangaManagerState/useTasksLimit";

export default function ServerTasksInfo(){
    const running = useRunningTasks();
    const limit = useTasksLimit();
    if(running.isSuccess && limit.isSuccess){
        return (
            <Progress value={(running.data / limit.data)}/>
        );
    }else {
        return (
            <Progress isIndeterminate/>
        );
    }
}