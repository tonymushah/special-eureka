import { useColorMode } from "@chakra-ui/system";
import { Button } from "@chakra-ui/react";
import { FiMoon, FiSun } from "react-icons/fi";


export default function ColorMode() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Button onClick={toggleColorMode} leftIcon={
            colorMode === "light" ? <FiSun/> : <FiMoon/>
        }>
            Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
    );
}