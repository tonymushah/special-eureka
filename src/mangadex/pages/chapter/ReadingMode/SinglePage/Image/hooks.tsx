import { Property } from "csstype";
import React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { ReactZoomPanPinchRef } from "react-zoom-pan-pinch";

export function useImageState(){
    const [isDisabled, setIsDisabled] = React.useState(true);
    const [isPanning, setIsPanning] = React.useState(false);
    const [isZooming, setIsZooming] = React.useState(false);
    const [isDeZooming, setIsDeZooming] = React.useState(false);
    const [isTransition, startTransition] = React.useTransition();
    const transformWarperRef = React.createRef<ReactZoomPanPinchRef>();
    useHotkeys("x", () => {
        transformWarperRef.current?.resetTransform();
    });
    const cursor = React.useMemo<Property.Cursor>(() => {
        if (isDisabled) {
            return "not-allowed";
        } else {
            if (isPanning) {
                return "grabbing";
            } else if (isZooming) {
                return "zoom-in";
            } else if(isDeZooming){
                return "zoom-out";
            } else {
                return "grab";
            }
        }
    }, [isDisabled, isPanning, isZooming, isDeZooming]);
    useHotkeys("ctrl", () => {
        setIsDisabled(!isDisabled);
    }, [isDisabled]);
    return {
        isDisabled,
        setIsDisabled,
        isPanning,
        setIsPanning,
        isZooming,
        setIsZooming,
        isDeZooming,
        setIsDeZooming,
        startTransition,
        cursor,
        isTransition,
        transformWarperRef
    };
}