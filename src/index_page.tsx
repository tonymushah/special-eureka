import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    React.useEffect(() => {
        navigate("/dashboard");
    });
    return (
        <></>
    );
}