import React from "react";
import Viewer from 'react-viewer';
import ReactDOM from "react-dom/client";
import { Api_Request, Api_RequestERROR } from "../../mangadex/api/internal/Api_Request"
import { Chapter } from "../../mangadex/api/structures/Chapter";
import { Manga } from "../../mangadex/api/structures/Manga";
import { Group } from "../../mangadex/api/structures/Group";
import { User } from "../../mangadex/api/structures/User"
import { Container, Placeholder, Row, Stack, Card, Spinner } from "react-bootstrap";
export class Chapter_page{
    private Chapter_toUse: Chapter;
    private Manga_rel: Manga;
    private Group_uploader: Group;
    private uploader: User;
    private imgs: Array<string>;
    private root: ReactDOM.Root;
    private current_page: number;
    public set_Chapter_toUse(Chapter_toUse: Chapter){
        this.Chapter_toUse = Chapter_toUse
    }
    public set_Manga_rel(Manga_rel: Manga){
        this.Manga_rel = Manga_rel
    }
    public set_Group_uploader(Group_uploader: Group){
        this.Group_uploader = Group_uploader
    }
    public set_uploader(uploader: User){
        this.uploader = uploader
    }
    public set_imgs(imgs: Array<string>){
        this.imgs = imgs
    }
    public set_root(root: ReactDOM.Root){
        this.root = root
    }

    public get_Chapter_toUse(): Chapter{
        return this.Chapter_toUse;
    }
    public get_Manga_rel(): Manga{
        return this.Manga_rel;
    }
    public get_Group_uploader(): Group{
        return this.Group_uploader;
    }
    public get_uploader(): User{
        return this.uploader;
    }
    public get_imgs(): Array<string>{
        return this.imgs;
    }
    public get_root(): ReactDOM.Root{
        return this.root;
    }

    public constructor(Chapter_toUse: Chapter, root: ReactDOM.Root){
        this.set_Chapter_toUse(Chapter_toUse);
    }
    public static initializeByID(id: string, root: ReactDOM.Root):Chapter_page | null{
        root.render(
            <>
                <Container>
                    <Row>
                        <p><Placeholder xs={2}/></p>
                        <p><Placeholder xs={3}/></p>
                    </Row>
                    <Row>
                        <Stack direction="horizontal" gap={3}>
                            <p><Placeholder xs={3}/></p>
                            <p><Placeholder xs={3}/></p>
                            <p><Placeholder xs={3}/></p>
                        </Stack>
                    </Row>
                    <Row>
                        <p> <i className=" fa fa-group"></i> <Placeholder xs={3}/></p>
                    </Row>
                    <Row>
                        <Card>
                            <Card.Body>
                                <Spinner animation="border"></Spinner>
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </>
        )
        try {
            
        } catch (error) {
            
        }
    }
    public render
}