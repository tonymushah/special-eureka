import { HotkeyCallback } from "react-hotkeys-hook";
import SinglePageImage_ from "../../SinglePage/Image";
import DoublePageImage_ from "../Image/RealDoublePage";

type DoublePageImageProps = {
    src: string | [string, string];
    onPrevious?: HotkeyCallback;
    onNext?: HotkeyCallback;
};

export default function DoublePageImage({ src , onPrevious, onNext} : DoublePageImageProps){
    if(typeof src == "string"){
        return (
            <SinglePageImage_ src={src} onPrevious={onPrevious} onNext={onNext}/>
        );
    }else{
        return (
            <DoublePageImage_ src={src} onPrevious={onPrevious} onNext={onNext}/>
        );
    }
}