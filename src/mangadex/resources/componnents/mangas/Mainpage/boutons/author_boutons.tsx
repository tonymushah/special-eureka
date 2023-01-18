import React from "react";
import { Button, Col } from "react-bootstrap";
import { make_first_UpperCare } from "../../../../../api/internal/Utils";
import { Author } from "../../../../../api/structures/Author";
export function AuthorButton(props : {
    src : Author
}){
    console.log(props.src);
    if(props.src !== undefined){
        return (<Button className="mdP-bout m-1" variant="dark" size="sm">{props.src.get_Name()}</Button>);
    }else{
        return (<></>)
    }
    
}
type AuthorColProps = {
    src : Array<Author>,
    title: "Authors" | "Artistists";
}
export class AuthorCol extends React.Component<AuthorColProps>{
    private to_use: Array<Author>;
    private title: string;
    constructor(props : AuthorColProps){
        super(props);
        console.log(props);
        this.to_use = this.props.src;
        this.title = this.props.title;
    }
    public build_AuthorButtons(): Array<React.ReactNode>{
        let returns : Array<React.ReactNode> = new Array<React.ReactNode>(this.to_use.length);
        for (let index = 0; index < this.to_use.length; index++) {
            returns[index] = (<AuthorButton src={this.to_use[index]}/>);
        }
        return returns;
    }
    render(): React.ReactNode {
        let tagButtons : Array<React.ReactNode> = this.build_AuthorButtons()
        if(tagButtons.length > 0){
            return (
                <Col>
                    <h5>{make_first_UpperCare(this.title)}</h5>
                    <div className="d-md-inline">
                        {tagButtons}
                    </div>
                </Col>
            )
        }else{
            return (<></>);
        }
    }
}