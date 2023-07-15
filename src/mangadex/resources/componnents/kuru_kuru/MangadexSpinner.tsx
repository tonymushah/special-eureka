import { SpinnerProps, Spinner } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { isActiveAtom } from "./atom";
import HertaSpinner from "./HertaSpinner/HertaSpinner";

export default function MangadexSpinner(props : SpinnerProps){
    const [isActive] = useAtom(isActiveAtom);
    if(isActive){
        return (
            <HertaSpinner {...props}/>
        );
    }else{
        return (
            <Spinner {...props}/>
        );
    }
}