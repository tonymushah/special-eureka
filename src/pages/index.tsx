import { Heading } from "@chakra-ui/react";
import { LoaderFunction } from "react-router";
import { redirect } from "@router";

export const Loader: LoaderFunction = async function () {
    return redirect("/dashboard");
};

export default function Index() {
    return (
        <Heading>Hello :3</Heading>
    );
}