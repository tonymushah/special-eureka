import { Button, Image } from "@chakra-ui/react";
import { favicon } from "./data";
import { useAtom } from "jotai";
import { isActiveAtom } from "./atom";
import invokeHerta, { getRandomGif } from "./invocation";
import React from "react";
import { useNavigate } from "react-router";
import { useMangaDexPath } from "@mangadex/index";

export default function ActivateKuru(){
    const [isActive, setIsActive] = useAtom(isActiveAtom);
    const [isLoading, start] = React.useTransition();
    const activate = React.useCallback(() => start(() => {
        setIsActive(!isActive);
        invokeHerta();
    }), [isActive]);
    const navigate = useNavigate();
    const MangadexPath = useMangaDexPath();
    return (
        <Button
            isLoading={isLoading}
            onClick={() => activate()}
            onContextMenu={(e) => {
                e.preventDefault();
                navigate(`${MangadexPath}/kuru`);
            }}
        >
            {
                isActive ? (
                    <Image
                        width={"25px"}
                        src={getRandomGif()}
                    />
                ) : (
                    <Image
                        width={"25px"}
                        src={favicon}
                    />
                )
            }
        </Button>
    );
}