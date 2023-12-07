import React from "react";
import { useProps } from "../Props";
import { useHoverBackGroundColor } from "./useHoverBackGroundColor";
import { useBackGroundColor } from "./useBackGroundColor";


export function useLayoutBackGround() {
    const props = useProps();
    const non_hover = useBackGroundColor();
    const on_hover = useHoverBackGroundColor();
    const backgroundColor = React.useMemo(() => {
        const { ongoing, completed, hiatus, cancelled, none, onRefetching } = non_hover;
        if (props.isRefetching == undefined) {
            if (props.src.get_status() == "ongoing") {
                return ongoing;
            } else if (props.src.get_status() == "completed") {
                return completed;
            } else if (props.src.get_status() == "hiatus") {
                return hiatus;
            } else if (props.src.get_status() == "cancelled") {
                return cancelled;
            } else {
                return none;
            }
        } else {
            if (props.isRefetching) {
                return onRefetching;
            } else {
                if (props.src.get_status() == "ongoing") {
                    return ongoing;
                } else if (props.src.get_status() == "completed") {
                    return completed;
                } else if (props.src.get_status() == "hiatus") {
                    return hiatus;
                } else if (props.src.get_status() == "cancelled") {
                    return cancelled;
                } else {
                    return none;
                }
            }
        }
    }, [props, non_hover]);
    const _hover_background = React.useMemo(() => {
        const { ongoing: hover_ongoing, completed: hover_completed, hiatus: hover_hiatus, cancelled: hover_cancelled, none: hover_none, onRefetching: none_onRefetching } = on_hover;
        if (props.isRefetching == undefined) {
            if (props.src.get_status() == "ongoing") {
                return hover_ongoing;
            } else if (props.src.get_status() == "completed") {
                return hover_completed;
            } else if (props.src.get_status() == "hiatus") {
                return hover_hiatus;
            } else if (props.src.get_status() == "cancelled") {
                return hover_cancelled;
            } else {
                return hover_none;
            }
        } else {
            if (props.isRefetching) {
                return none_onRefetching;
            } else {
                if (props.src.get_status() == "ongoing") {
                    return hover_ongoing;
                } else if (props.src.get_status() == "completed") {
                    return hover_completed;
                } else if (props.src.get_status() == "hiatus") {
                    return hover_hiatus;
                } else if (props.src.get_status() == "cancelled") {
                    return hover_cancelled;
                } else {
                    return hover_none;
                }
            }
        }
    }, [props, on_hover]);
    return {
        backgroundColor,
        _hover_background
    };
}
