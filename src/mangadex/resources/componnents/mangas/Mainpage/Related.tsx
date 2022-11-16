import React from "react";
import * as Chakra from "@chakra-ui/react";
import * as ChakraIcons from "@chakra-ui/icons";
import { Manga } from "../../../../api/structures/Manga";

type RelatedProps = {
    src : Manga
}

export default class Related extends React.Component<RelatedProps>{
    private to_use : Manga;

    /**
     * Getter $to_use
     * @return {Manga}
     */
	public get $to_use(): Manga {
		return this.to_use;
	}

    /**
     * Setter $to_use
     * @param {Manga} value
     */
	public set $to_use(value: Manga) {
		this.to_use = value;
	}

    public constructor(props : RelatedProps){
        super(props);
        this.to_use = this.props.src;
    }
    public get_related(){
    }
    render(): React.ReactNode {
        return (
            <></>
        )
    }
}