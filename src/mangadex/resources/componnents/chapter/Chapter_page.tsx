import React from "react";
import { Chapter } from "../../../api/structures/Chapter";
import { Manga } from "../../../api/structures/Manga";
import { Group } from "../../../api/structures/Group";
import { User } from "../../../api/structures/User"
import { Container, Row, Col } from "react-bootstrap";
import * as Chakra from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import * as NSwiper from "swiper";
import { Await, Link, useAsyncError } from "react-router-dom";
import { At_Home } from "../../../api/structures/At_home";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import { Alt_title } from "../../../api/internal/Utils";
import * as ChakraIcons from "@chakra-ui/icons";
import * as FaReactIcons from "react-icons/fa"
import { Aggregate } from "../../../api/structures/Aggregate";
import { getMangaDexPath } from "../../..";
const MangaDexPath = getMangaDexPath();
function ErrorEL(props){
    let error : any = useAsyncError();
    return(
        <Chakra.Alert status="error">
            <Chakra.AlertIcon></Chakra.AlertIcon>
            <Chakra.AlertTitle>We caught some error</Chakra.AlertTitle>
            <Chakra.AlertDescription>{error.message}</Chakra.AlertDescription>
        </Chakra.Alert>
    )
}

type Chapter_pageProps = {
    src : Chapter
    page?: number;
}


function Chap_page_menu(props: React.PropsWithChildren){
    const { isOpen, onOpen, onClose } = Chakra.useDisclosure()
    return(
        <>
        <Chakra.Center 
            onClick={onOpen}
        >
            <ChakraIcons.ArrowLeftIcon></ChakraIcons.ArrowLeftIcon>
            &nbsp;
            Menu
            </Chakra.Center>
            <Chakra.Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
            >
                <Chakra.DrawerContent>
                    {props.children}
                </Chakra.DrawerContent>
            </Chakra.Drawer>
        </>
    )
}

function Page_list(props: React.ComponentPropsWithRef<any>){
    return (
        <Chakra.Menu>
            <></>
        </Chakra.Menu>
    )
}
export class Chapter_page extends React.Component<Chapter_pageProps>{
    private Chapter_toUse: Chapter;
    private Manga_rel: Manga;
    private Group_uploader: Group;
    private uploader: User;
    private imgs: Array<string>;
    private current_page: number;
    private nb_page : number;
    private menu_open: boolean;
    private current_page_ref: React.RefObject<HTMLSpanElement>;
    private current_page_ref2: React.RefObject<HTMLSpanElement>;
    private swiper_ref: React.RefObject<NSwiper.Swiper>;
    /**
     * Getter $is_menu_open
     * @return {boolean}
     */

    /**
     * Getter $current_page_ref2
     * @return {React.RefObject<HTMLSpanElement>}
     */
	public get $current_page_ref2(): React.RefObject<HTMLSpanElement> {
		return this.current_page_ref2;
	}

    /**
     * Setter $current_page_ref2
     * @param {React.RefObject<HTMLSpanElement>} value
     */
	public set $current_page_ref2(value: React.RefObject<HTMLSpanElement>) {
		this.current_page_ref2 = value;
	}
	public get $is_menu_open(): boolean {
		return this.menu_open;
	}

    /**
     * Setter $is_menu_open
     * @param {boolean} value
     */
	public set $is_menu_open(value: boolean) {
		this.menu_open = value;
	}
    public toggleOpen(){
        if(this.$is_menu_open == false || this.$is_menu_open == undefined){
            this.$is_menu_open = true
        }else{
            this.$is_menu_open = false
        }
    }
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

    /**
     * Getter $current_page
     * @return {number}
     */
	public get $current_page(): number {
		return this.current_page;
	}

    /**
     * Setter $current_page
     * @param {number} value
     */
	public set $current_page(value: number) {
		this.current_page = value;
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
    public constructor(props: Chapter_pageProps){
        super(props);
        this.$is_menu_open = false;
        this.Chapter_toUse = this.props.src;
        this.$current_page = 0;
        this.current_page_ref = React.createRef();
        this.current_page_ref2 = React.createRef();
        this.swiper_ref = React.createRef();
        this.$nb_page = this.Chapter_toUse.get_pages();
        try{
            this.current_page_ref.current!.innerText = "" + (this.$current_page + 1);
            this.current_page_ref2.current!.innerText = "" + (this.$current_page + 1);
        }catch(e){

        }
    }
    public current_page_Ref1(): React.ReactNode{
        try{
            return (
                <>{this.current_page_ref.current!.innerText}</>
            )
        }catch(e){
            return(
                <>{this.$current_page}</>
            )
        }
    }
    public makelist_Page(): Array<React.ReactNode>{
        let returns: Array<React.ReactNode> = [];
        for(let index = 0; index < this.Chapter_toUse.get_pages(); index++){
            returns[index] = (
                <Chakra.MenuList
                    onClick={() =>{
                        this.$current_page = index;
                        try{
                            this.current_page_ref.current!.innerText = "" + (this.$current_page + 1);
                            this.current_page_ref2.current!.innerText = "" + (this.$current_page + 1);
                        }catch(e){

                        }
                        document.getElementById("atHome_pages")!.scrollIntoView()
                    }}
                >
                    {index + 1}
                </Chakra.MenuList>
            )
        }
        return returns;
    }
    /**
     * Getter $nb_page
     * @return {number}
     */
	public get $nb_page(): number {
		return this.nb_page;
	}

    /**
     * Setter $nb_page
     * @param {number} value
     */
	public set $nb_page(value: number) {
		this.nb_page = value;
	}

    render(): React.ReactNode {
        this.$current_page = 0
        return (
            <Chakra.Box>
                <Container>
                    <Chakra.Box>
                        <Row>
                            <Col>
                                <Row>
                                    <Chakra.Text>Chapter {this.Chapter_toUse.get_chapter()}  {this.Chapter_toUse.get_title()}</Chakra.Text>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <React.Suspense
                                fallback={
                                    <Chakra.Skeleton
                                        height="20px"
                                    ></Chakra.Skeleton>
                                }
                            >
                                <Await
                                    resolve={Manga.getMangaByID(this.Chapter_toUse.get_some_relationship("manga")[0].get_id())}
                                    errorElement={
                                        <ErrorEL/>
                                    }
                                    children={(getted: Manga) => {
                                        let title: string = "";
                                        if (getted.get_title().en == null) {
                                            title = new Alt_title(getted.get_alt_title()).get_quicklang()!;
                                        }else{
                                            title = getted.get_title().en;
                                        }
                                        return (
                                            <Chakra.Text><Link to={MangaDexPath + "/manga/" + getted.get_id()} >{title}</Link></Chakra.Text>
                                        );
                                    }}
                                />
                            </React.Suspense>
                        </Row>
                        <Row>
                            <Col>
                            {/* 
                                The volume and chapter
                            */}
                                <Chakra.Center>
                                    <React.Suspense
                                        fallback={
                                            <Chakra.Skeleton
                                                height="20px"
                                            ></Chakra.Skeleton>
                                        }
                                    >
                                        <Await
                                            resolve={this.Chapter_toUse.get_current()}
                                            errorElement={<ErrorEL></ErrorEL>}
                                        >
                                            {(getted : string) => {
                                                return (
                                                    <Chakra.Text>{getted}</Chakra.Text>
                                                )
                                            }}
                                        </Await>
                                    </React.Suspense>
                                </Chakra.Center>
                            </Col>
                            <Col>
                                <Chakra.Center>
                                    <Chakra.Text> <span ref={this.current_page_ref}>1</span> / {this.Chapter_toUse.get_pages()}</Chakra.Text>
                                </Chakra.Center>
                            </Col>
                            <Col>
                                <Chap_page_menu>
                                    <Chakra.DrawerCloseButton/>
                                        <Chakra.DrawerHeader>
                                            <Row>
                                                <Chakra.Box display={"flex"}>
                                                    <Chakra.Icon as={FaReactIcons.FaBookOpen}/>
                                                    &nbsp; 
                                                    &nbsp;
                                                    <React.Suspense
                                                        fallback={
                                                            <Chakra.Skeleton
                                                                height="20px"
                                                            ></Chakra.Skeleton>
                                                        }
                                                    >
                                                        <Await
                                                            resolve={Manga.getMangaByID(this.Chapter_toUse.get_some_relationship("manga")[0].get_id())}
                                                            errorElement={
                                                                <ErrorEL/>
                                                            }
                                                            children={(getted: Manga) => {
                                                                let title: string = "";
                                                                if (getted.get_title().en == null) {
                                                                    title = new Alt_title(getted.get_alt_title()).get_quicklang()!;
                                                                }else{
                                                                    title = getted.get_title().en;
                                                                }
                                                                return (
                                                                    <Chakra.Text><Link to={MangaDexPath + "/manga/" + getted.get_id()} >{title}</Link></Chakra.Text>
                                                                );
                                                            }}
                                                        />
                                                    </React.Suspense>
                                                </Chakra.Box>
                                            </Row>
                                            <Row>
                                                <Chakra.Box display={"flex"}>
                                                    <Chakra.Icon as={FaReactIcons.FaFile}/>
                                                    &nbsp; 
                                                    &nbsp;
                                                <Chakra.Text>Chapter {this.Chapter_toUse.get_chapter()}</Chakra.Text>
                                                </Chakra.Box>
                                            </Row>
                                        </Chakra.DrawerHeader>
                                        <Chakra.DrawerBody>
                                            <Chakra.Box>
                                                <Row>
                                                    <Chakra.HStack>
                                                        <React.Suspense>
                                                            <Await
                                                                resolve={this.Chapter_toUse.get_previous()}
                                                                errorElement={
                                                                    <Chakra.Button
                                                                        as={Link}
                                                                        to={MangaDexPath + "/manga/"+this.Chapter_toUse.get_some_relationship("manga")[0].get_id()}
                                                                    >
                                                                        <ChakraIcons.ChevronLeftIcon/>
                                                                    </Chakra.Button>
                                                                }
                                                            >
                                                                {(getted12 : string) => {
                                                                    return (
                                                                        <Chakra.Button
                                                                            as={Link}
                                                                            to={MangaDexPath + "/chapter/" + getted12}
                                                                        >
                                                                            <ChakraIcons.ChevronLeftIcon/>
                                                                        </Chakra.Button>
                                                                    );
                                                                }}
                                                            </Await>
                                                        </React.Suspense>
                                                        <Chakra.Menu>
                                                            <Chakra.MenuButton as={Chakra.Button} rightIcon={<ChakraIcons.ChevronDownIcon></ChakraIcons.ChevronDownIcon>}>
                                                                <Chakra.Text>Chapter</Chakra.Text>
                                                                <Chakra.Box >
                                                                    <Chakra.Center>
                                                                        <React.Suspense
                                                                            fallback={
                                                                                <Chakra.Skeleton
                                                                                    height="20px"
                                                                                ></Chakra.Skeleton>
                                                                            }
                                                                        >
                                                                            <Await
                                                                                resolve={this.Chapter_toUse.get_current()}
                                                                                errorElement={<ErrorEL></ErrorEL>}
                                                                            >
                                                                                {(getted : string) => {
                                                                                    return (
                                                                                        <Chakra.Text>{getted}</Chakra.Text>
                                                                                    )
                                                                                }}
                                                                            </Await>
                                                                        </React.Suspense>
                                                                    </Chakra.Center>
                                                                </Chakra.Box>
                                                            </Chakra.MenuButton>
                                                            <Chakra.MenuList>
                                                                <React.Suspense>
                                                                    <Await
                                                                        resolve={this.Chapter_toUse.getAggregateList()}
                                                                        errorElement={<ErrorEL></ErrorEL>}
                                                                    >
                                                                        {(getted : Aggregate) => {
                                                                            let returns : Array<React.ReactNode> = [];
                                                                            let topIndex = 0;
                                                                            for (let index = 0; index < getted.get_volumes().length; index++) {
                                                                                const volume = getted.get_volumes()[index];
                                                                                for (let index2 = 0; index2 < volume.get_chapters().length; index2++) {
                                                                                    const chapter = volume.get_chapters().reverse()[index2];
                                                                                    returns[topIndex] = (
                                                                                        <Chakra.MenuItem
                                                                                            as={Link}
                                                                                            to={MangaDexPath + "/chapter/" + chapter.get_chapters()[0].get_id()}
                                                                                        >
                                                                                            Vol. {
                                                                                                volume.get_name()
                                                                                            } Ch. {
                                                                                                chapter.get_name()
                                                                                            }
                                                                                        </Chakra.MenuItem>
                                                                                    );
                                                                                    topIndex = topIndex + 1 ;
                                                                                }
                                                                            }
                                                                            return (
                                                                                <>{
                                                                                    returns
                                                                                }</>
                                                                            )
                                                                        }}
                                                                    </Await>
                                                                </React.Suspense>
                                                            </Chakra.MenuList>
                                                        </Chakra.Menu>
                                                        <React.Suspense>
                                                            <Await
                                                                resolve={this.Chapter_toUse.get_next()}
                                                                errorElement={
                                                                    <Chakra.Button
                                                                        as={Link}
                                                                        to={MangaDexPath + "/manga/"+this.Chapter_toUse.get_some_relationship("manga")[0].get_id()}
                                                                    >
                                                                        <ChakraIcons.ChevronRightIcon/>
                                                                    </Chakra.Button>
                                                                }
                                                            >
                                                                {(getted121 : string) => {
                                                                    return (
                                                                        <Chakra.Button
                                                                            as={Link}
                                                                            to={MangaDexPath + "/chapter/" + getted121}
                                                                        >
                                                                            <ChakraIcons.ChevronRightIcon/>
                                                                        </Chakra.Button>
                                                                    );
                                                                }}
                                                            </Await>
                                                        </React.Suspense>
                                                    </Chakra.HStack>
                                                </Row>
                                            </Chakra.Box>
                                            <Chakra.Divider />
                                            <Row>
                                                <Chakra.Heading size={"lg"}>
                                                    Uploaded by
                                                </Chakra.Heading>
                                                <Chakra.Box>
                                                    <React.Suspense
                                                        fallback={
                                                            <Chakra.Skeleton></Chakra.Skeleton>
                                                        }
                                                    >
                                                        <Await 
                                                            resolve={this.Chapter_toUse.get_userUploader()}
                                                            errorElement={<ErrorEL></ErrorEL>}
                                                        >
                                                            {(getted : User) => {
                                                                return (
                                                                    <Chakra.Text>
                                                                        <Chakra.Icon as={FaReactIcons.FaUser}></Chakra.Icon>
                                                                        &nbsp; 
                                                                        &nbsp;
                                                                        {getted.get_username()}
                                                                    </Chakra.Text>
                                                                )
                                                            }}
                                                        </Await>
                                                    </React.Suspense>
                                                    <React.Suspense
                                                        fallback={
                                                            <Chakra.Skeleton></Chakra.Skeleton>
                                                        }
                                                    >
                                                        <Await 
                                                            resolve={this.Chapter_toUse.get_groupUploaders()}
                                                            errorElement={
                                                                <Chakra.Text>
                                                                    <Chakra.Icon as={FaReactIcons.FaUsers}></Chakra.Icon>
                                                                    &nbsp; 
                                                                    &nbsp;
                                                                    <Chakra.Text as='i'>No Group</Chakra.Text>
                                                                </Chakra.Text>
                                                            }
                                                        >
                                                            {(getted : Group[]) => {
                                                                let to_show : Array<React.ReactNode> = [];
                                                                for (let index = 0; index < getted.length; index++) {
                                                                    const group = getted[index];
                                                                    if(index == getted.length - 1){
                                                                        to_show[index] = (
                                                                            <>{
                                                                                group.get_name()
                                                                            }</>
                                                                        )
                                                                    }else{
                                                                        to_show[index] = (
                                                                            <>{
                                                                                group.get_name()
                                                                            } | </>
                                                                        )
                                                                    }
                                                                }
                                                                return (

                                                                    <Chakra.Text>
                                                                        <Chakra.Icon as={FaReactIcons.FaUsers}></Chakra.Icon>
                                                                        &nbsp; 
                                                                        &nbsp;
                                                                        {
                                                                            to_show
                                                                        }
                                                                    </Chakra.Text>
                                                                )
                                                            }}
                                                        </Await>
                                                    </React.Suspense>
                                                </Chakra.Box>
                                            </Row>
                                            <Chakra.Divider/>
                                        </Chakra.DrawerBody>
                                </Chap_page_menu>
                            </Col>
                        </Row>
                    </Chakra.Box>
                    <Row id="atHome_pages">
                        <React.Suspense fallback={
                            <Chakra.Spinner
                                thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='orange.500'
                                size='xl'
                            />
                        }>
                            <Await
                                resolve={At_Home.getAt_Home_wChID(this.Chapter_toUse.get_id())}
                                errorElement={
                                    <ErrorEL/>
                                }
                            >
                                {(getted : At_Home) => {
                                        let imgs : Array<string> = getted.get_data_ImgURL();
                                        this.$nb_page = imgs.length;
                                        return (
                                            <Swiper
                                                onLoad={() =>{
                                                    this.current_page_ref2 = React.createRef();
                                                }}
                                                slidesPerView={1}
                                                keyboard={{
                                                    enabled: true
                                                }}
                                                tabIndex={this.current_page}
                                                centeredSlides={true}
                                                zoom={true}
                                                modules={[
                                                    NSwiper.Scrollbar,
                                                    NSwiper.Keyboard,
                                                    NSwiper.Navigation,
                                                    NSwiper.Zoom
                                                ]}
                                                
                                                onSlideChange={(swiper) => {
                                                    this.current_page = swiper.activeIndex;
                                                    try{
                                                        this.current_page_ref.current!.innerText = "" + (this.$current_page + 1);
                                                        this.current_page_ref2.current!.innerText = "" + (this.$current_page + 1);
                                                    }catch(e){
                                                    }   
                                                    document.getElementById("atHome_pages")!.scrollIntoView()
                                                }}
                                                navigation={true}
                                            >
                                                {
                                                    imgs.map((getted) => (
                                                        <SwiperSlide className=" align-content-center">
                                                            <Container>
                                                                <Row>
                                                                    <LazyLoadComponent
                                                                        placeholder={
                                                                            <Chakra.Box display={"block"}>
                                                                                <Chakra.Center height={"100vh"}>
                                                                                    <Chakra.Spinner
                                                                                        thickness="10px"
                                                                                        size={"xl"}
                                                                                    />
                                                                                </Chakra.Center>
                                                                            </Chakra.Box>
                                                                        }
                                                                    >
                                                                        <LazyLoadImage
                                                                            beforeLoad={() => {
                                                                            }}
                                                                            placeholder={
                                                                                <Chakra.Box display={"block"}>
                                                                                    <Chakra.Center height={"100vh"}>
                                                                                        <Chakra.Spinner
                                                                                            thickness="10px"
                                                                                            size={"xl"}
                                                                                        />
                                                                                    </Chakra.Center>
                                                                                </Chakra.Box>
                                                                            }
                                                                            key={getted}
                                                                            src={getted}
                                                                        />
                                                                    </LazyLoadComponent>
                                                                </Row>
                                                            </Container>
                                                        </SwiperSlide>
                                                    ))
                                                }
                                            </Swiper>
                                        );
                                    }
                                }
                            </Await>
                        </React.Suspense>
                    </Row>
                </Container>
            </Chakra.Box>
        );
    }
}