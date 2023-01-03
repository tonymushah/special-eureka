import React from "react";
import * as Chakra from "@chakra-ui/react";
import { useAsyncError } from "react-router-dom";

export default function Side_bar_error_el(props: {
    toastId: Chakra.ToastId,
    callAfter: () => void
}) {
    let error = useAsyncError();
    const toast = Chakra.useToast();
    toast.update(props.toastId, {
        title: "Error",
        isClosable: true,
        duration: 9000,
        description: error,
        status: "error"
    });
    props.callAfter();
    return (<></>);
}