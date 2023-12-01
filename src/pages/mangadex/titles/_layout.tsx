import { Outlet } from "react-router";

export default function GroupLayout() {
    return (
        <Outlet />
    );
}

export { default as Catch } from "@mangadex/resources/componnents/router/error/Boundary";