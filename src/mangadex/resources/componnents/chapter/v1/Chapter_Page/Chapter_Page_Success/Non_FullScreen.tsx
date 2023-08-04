import { useChapterFullscreen } from "@mangadex/resources/componnents/chapter/fullscreen/Context";
import React from "react";
import Chapter_on_non_FullScreen from "./Chapter_on_non_FullScreen";

export default function Non_FullScreen(){
    const fullscreen = useChapterFullscreen();
    if(fullscreen.query.data == false){
        return (
            <Chapter_on_non_FullScreen />
        );
    }else{
        return (
            <React.Fragment/>
        );
    }
}