import React, { useState } from "react";
import { Manga } from "../structures/Manga";
import El_Manga_simple from "./Manga";
import El_Manga_simple2 from "./Manga2";
import ReactDOM from 'react-dom/client';
import { Button, ButtonGroup, Card, CardGroup, Container, ProgressBar, Row, Col, Collapse} from "react-bootstrap";
import { Tag } from "../structures/Tag";
import { TagButton } from "./TagBoxes";
import * as FontAwesome from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.css"
class MangaList{
    private MangaArray: Array<Manga>;
    private mode1: React.ReactNode;
    private mode2: React.ReactNode;
    private mode3: React.ReactNode;
    private root: ReactDOM.Root;
    private mode: number;
    private boxToUse: JSX.Element;
    public set_MangaArray(MangaArray: Array<Manga>){
        this.MangaArray = MangaArray;
    }
    public set_Mode1(mode1: React.ReactNode){
        this.mode1 = mode1;
    }
    public set_Mode2(mode2: React.ReactNode){
        this.mode2 = mode2;
    }
    public set_Mode3(mode3: React.ReactNode){
        this.mode3 = mode3;
    }
    public set_Root(root: ReactDOM.Root){
        this.root = root;
    }
    public get_MangaArray(): Array<Manga>{
        return this.MangaArray;
    }
    public get_Mode1(): React.ReactNode{
        return this.mode1;
    }
    public get_Mode2(): React.ReactNode{
        return this.mode2;
    }
    public get_Mode3(): React.ReactNode{
        return this.mode3;
    }
    public get_Root(): ReactDOM.Root{
        return this.root;
    }
    public constructor(MangaArray: Array<Manga>, root: ReactDOM.Root){
        this.set_MangaArray(MangaArray);
        this.set_Root(root);
        this.mode = 1;
        this.put_Mode1 = this.put_Mode1.bind(this);
        this.put_Mode2 = this.put_Mode2.bind(this);
        this.root.render(
            <Card>
                <Card.Header>
                    <div>
                        <ButtonGroup>
                            <Button onClick={() => {
                                this.put_Mode1().finally();
                            }}><i className="fas align-justify" /> </Button>
                            <Button onClick={() => {
                                this.put_Mode2().finally();
                            }}><i className="fas border-all" /> </Button>
                            <Button><i className="fas columns" /> </Button>
                        </ButtonGroup>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className='container'>
                        <div className='row'>
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status"></div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="d-flex justify-content-center">
                                <p id='loading-prct'>Loading...</p>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        );
    }
    public async initialize_mode1(){
        this.root.render(
            <Card>
                <Card.Header>
                    <div className="d-flex flex-row-reverse">
                        <ButtonGroup>
                            <Button onClick={() => {
                                this.put_Mode1().finally();
                            }}><i className="fas align-justify"></i> </Button>
                            <Button onClick={() => {
                                this.put_Mode2().finally();
                            }}><i className="fas border-all"></i> </Button>
                            <Button><i className="fas columns"></i> </Button>
                        </ButtonGroup>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className='container'>
                        <div className='row'>
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status"></div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="d-flex justify-content-center">
                                <p id='loading-prct'>Executing Scripts...</p>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        );
        var el_manga1_mode = Array<React.ReactNode>(this.MangaArray.length);
        for(let index = 0; index < this.MangaArray.length; index++){
            const Manga_use = this.MangaArray[index];
            el_manga1_mode[index] = (await (new El_Manga_simple(Manga_use)).render());
            const to_modify = ReactDOM.createRoot(document.getElementById("loading-prct")!);
            to_modify.render(
                <div className='d-block'>
                    <br/>
                    <p className='d-flex justify-content-center'>Getting Manga : {Manga_use.get_id()} ...</p>
                    <ProgressBar now={(index / this.MangaArray.length) * 100} label={((index / this.MangaArray.length) * 100) + " %"}></ProgressBar>
                </div>
            )
        }
        this.set_Mode1(
            <div className="d-block">
                <div className="d-inline-flex">
                    {el_manga1_mode}
                </div>
            </div>
        )
    }
    public async put_Mode1(){
        if(this.mode1 == null){
            await this.initialize_mode1();
        }
        this.root.render(
            <Card>
                <Card.Header>
                    <div className="d-flex flex-row-reverse">
                        <ButtonGroup>
                            <Button onClick={() => {
                                this.put_Mode1().finally();
                            }}><i className="fas align-justify"></i> </Button>
                            <Button onClick={() => {
                                this.put_Mode2().finally();
                            }}><i className="fas border-all"></i> </Button>
                            <Button><i className="fas columns"></i> </Button>
                        </ButtonGroup>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className='container'>
                        {this.get_Mode1()}
                    </div>
                </Card.Body>
            </Card>
        );
    }
    public async initialize_mode2(){
        this.root.render(
            <Card>
                <Card.Header>
                    <div className="d-flex flex-row-reverse">
                        <ButtonGroup>
                            <Button onClick={() => {
                                this.put_Mode1().finally();
                            }}><i className="fas align-justify"></i> </Button>
                            <Button onClick={() => {
                                this.put_Mode2().finally();
                            }}><i className="fas border-all"></i> </Button>
                            <Button><i className="fas columns"></i> </Button>
                        </ButtonGroup>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className='container'>
                        <div className='row'>
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status"></div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="d-flex justify-content-center">
                                <p id='loading-prct'>Executing Scripts...</p>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        );
        var el_manga2_mode = Array<React.ReactNode>(this.MangaArray.length);
        for(let index = 0; index < this.MangaArray.length; index++){
            const Manga_use = this.MangaArray[index];
            el_manga2_mode[index] = (await (new El_Manga_simple2(Manga_use)).render());
            const to_modify = ReactDOM.createRoot(document.getElementById("loading-prct")!);
            to_modify.render(
                <div className='d-block'>
                    <br/>
                    <p className='d-flex justify-content-center'>Getting Manga : {Manga_use.get_id()} ...</p>
                    <ProgressBar now={(index / this.MangaArray.length) * 100} label={((index / this.MangaArray.length) * 100) + " %"}></ProgressBar>
                </div>
            )
        }
        var lines = el_manga2_mode.length;
        var divised_manga2 = Array<React.ReactNode>(lines);
        for (let index = 0; index < divised_manga2.length; index++) {
            divised_manga2[index] = (<Row>
                    {el_manga2_mode[index]}
                </Row>
            );
        }
        this.set_Mode2(<Container>
            {divised_manga2}
        </Container>);
    }
    public async put_Mode2(){
        if(this.mode2 == null){
            await this.initialize_mode2();
        }
        this.root.render(
            <Card>
                <Card.Header>
                    <div className="d-flex flex-row-reverse">
                        <ButtonGroup>
                            <Button onClick={() => {
                                this.put_Mode1().finally();
                            }}><i className="fas align-justify"></i> </Button>
                            <Button onClick={() => {
                                this.put_Mode2().finally();
                            }}><i className="fas border-all"></i> </Button>
                            <Button><i className="fas columns"></i> </Button>
                        </ButtonGroup>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className='container'>
                        {this.get_Mode2()}
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default MangaList;