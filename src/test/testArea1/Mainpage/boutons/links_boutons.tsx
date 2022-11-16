import React from "react";
import ReactDOM from "react-dom/client";
import { Accordion, Overlay, Spinner, Button, ButtonGroup, Card, CardGroup, Container, ProgressBar, Row, Col, Collapse, Placeholder } from "react-bootstrap";
import { make_first_UpperCare, MangaLinksData } from "../../../../mangadex/api/internal/Utils";
import { ExtLink } from "../../../../commons-res/components/ExtLink";
type LinkButtonProps = { 
    title: string,
    href: string
};
export function LinkButton(props: LinkButtonProps){
    return (
        <ExtLink href={props.href}>
            <Button className="m-1 mdP-bout" variant="dark" size="sm">{props.title}</Button>
        </ExtLink>
    );
}

type LinksRowProps = {
    src : any,
    title: "Read or Buy" | "Track";
}
export class LinksRow extends React.Component<LinksRowProps>{
    private to_use: any;
    private title: string;
    constructor(props : LinksRowProps){
        super(props);
        this.to_use = this.props.src;
        this.title = this.props.title;
    }
    public build_LinkButtons(): Array<React.ReactNode>{
        var returns : Array<React.ReactNode> = [];
        let index = 0;
        for (const key in this.to_use) {
            if (Object.prototype.hasOwnProperty.call(this.to_use, key)) {
                const element = this.to_use[key];
                if(element == null){
                    continue
                }else{
                    returns[index] = (<LinkButton title={key} href={element}/>)
                    index = index + 1;
                }
            }
        }
        return returns;
    }
    render(): React.ReactNode {
        var LinksButtons : Array<React.ReactNode> = this.build_LinkButtons()
        if(LinksButtons.length != 0){
            return (
                <Row>
                    <h5>{make_first_UpperCare(this.title)}</h5>
                    <div className="d-md-inline">
                        {LinksButtons}
                    </div>
                </Row>
            )
        }else{
            return (<></>);
        }
    }
}