import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Await } from "react-router-dom";
import { make_first_UpperCare, Manga_related } from "../../../../api/internal/Utils";
import { Manga } from "../../../../api/structures/Manga";
import { ErrorELAsync1 } from "../../Error_cmp";
import MangaElementDef from "../v1/MangaElementDef";

type RelatedProps = {
    src : Manga
}

export function MangaRelated_Section(props: {
    src: Manga,
    enum : string
}){
    let length = props.src.get_related_manga_byEnum_length(props.enum);
    if(length == 0){
        return (<></>);
    }else{
        return (
            <Chakra.Box>
                <Chakra.Heading fontFamily={"inherit"}>{make_first_UpperCare(props.enum)}</Chakra.Heading>
                <Chakra.Box>
                    <React.Suspense
                        fallback={
                            <Chakra.Box>
                                <Chakra.Center>
                                    <Chakra.Spinner/>
                                </Chakra.Center>
                            </Chakra.Box>
                        }
                    >
                        <Await
                            resolve={props.src.get_related_manga_byEnum(props.enum)}
                            errorElement={<ErrorELAsync1/>}
                        >
                            {(getted : Array<Manga>) => {
                                return (
                                    <Chakra.Wrap>
                                        {getted.map(value => (
                                            <Chakra.WrapItem>
                                                <MangaElementDef src={value}/>
                                            </Chakra.WrapItem>
                                        ))}
                                    </Chakra.Wrap>
                                )
                            }}
                        </Await>
                    </React.Suspense>
                </Chakra.Box>
            </Chakra.Box>
        )
    }
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
            <Chakra.VStack
                divider={<Chakra.Divider/>}
            >
                <MangaRelated_Section 
                    src={this.to_use}
                    enum={Manga_related.adapted_from()}
                />
                <MangaRelated_Section 
                    src={this.to_use}
                    enum={Manga_related.alternate_story()}
                />
                <MangaRelated_Section 
                    src={this.to_use}
                    enum={Manga_related.alternate_version()}
                />
                <MangaRelated_Section 
                    src={this.to_use}
                    enum={Manga_related.based_on()}
                />
                <MangaRelated_Section 
                    src={this.to_use}
                    enum={Manga_related.colored()}
                />
                <MangaRelated_Section 
                    src={this.to_use}
                    enum={Manga_related.doujinshi()}
                />
                <MangaRelated_Section 
                    src={this.to_use}
                    enum={Manga_related.main_story()}
                />
                <MangaRelated_Section 
                    src={this.to_use}
                    enum={Manga_related.monochrome()}
                />
                <MangaRelated_Section 
                    src={this.to_use}
                    enum={Manga_related.prequel()}
                />
                <MangaRelated_Section 
                    src={this.to_use}
                    enum={Manga_related.preserialization()}
                />
                <MangaRelated_Section 
                    src={this.to_use}
                    enum={Manga_related.same_franchise()}
                />
                <MangaRelated_Section 
                    src={this.to_use}
                    enum={Manga_related.sequel()}
                />
                <MangaRelated_Section 
                    src={this.to_use}
                    enum={Manga_related.shared_universe()}
                />
                <MangaRelated_Section 
                    src={this.to_use}
                    enum={Manga_related.side_story()}
                />
                <MangaRelated_Section 
                    src={this.to_use}
                    enum={Manga_related.spin_off()}
                />
            </Chakra.VStack>
        )
    }
}