import React from "react";
import * as Chakra from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    React.useEffect(() => {
        navigate("/dashboard");
    })
    return (
        <></>
    );
}