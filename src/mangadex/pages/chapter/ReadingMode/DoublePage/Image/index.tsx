import { HotkeyCallback } from "react-hotkeys-hook"
import { useImageState } from "../../SinglePage/Image/hooks";

export default function DoublePageImage({ src , onPrevious, onNext} : {
    src: string | Array<string>,
    onPrevious?: HotkeyCallback,
    onNext?: HotkeyCallback
}){
    
}