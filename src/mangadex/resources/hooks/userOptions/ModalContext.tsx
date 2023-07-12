import { atom, useAtom } from "jotai";

const modalAtom = atom(false);

export default function useUserOptionModal(){
    const [ state, changeOption ] = useAtom(modalAtom);
    const toggle = () => {
        changeOption(!state);
    };
    return {
        state,
        changeOption,
        toggle
    };
}