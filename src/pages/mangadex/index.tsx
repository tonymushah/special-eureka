import HomeAfterPing from "@mangadex/pages/Home/HomeAfterPing";
import { loader } from "@mangadex/pages/Home/loader";
import { LoaderFunction } from "react-router";
import { appWindow } from "@tauri-apps/api/window";

export const Loader: LoaderFunction = async (params) => {
    await appWindow.setTitle("High Quality Image, no ads | Mangadex");
    return loader(params);
};

export default function Home() {
    return (
        <HomeAfterPing />
    );
}

export { default as Catch } from "@mangadex/resources/componnents/router/error/Boundary";