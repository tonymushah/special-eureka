import axios from "./client";
import Chapter from "./interfaces/Chapter";
import Comic from "./interfaces/Comic";
import ComicDetail from "./interfaces/ComicDetail";

export default class bilibilicomics {
    auth?: string;
    area?: string;
    refreshtoken?: string;
    constructor(auth?: string, area?: string, refreshtoken?: string) {
        this.auth = `Bearer ${auth}`;
        this.area = area;
        this.refreshtoken = refreshtoken;
        setInterval(() => {
            if (this.auth && this.area && this.refreshtoken) {
                this.refreshToken();
            }
        }, 60000);
    }

    public async getDetails(id: string): Promise<ComicDetail> {
        try {
            let res = await axios.post(
                "https://www.bilibilicomics.com/twirp/comic.v1.Comic/ComicDetail?device=android&platform=app",
                { comic_id: id }
            );
            let title = res.data.data.title;
            let episodes = res.data.data.ep_list;
            let epcount = res.data.data.total;
            let cover = res.data.data.horizontal_cover;
            let desc = res.data.data.evaluate;
            let url = `https://www.bilibilicomics.com/detail/mc${res.data.data.id}`;
            return {
                cover: cover,
                title: title,
                url: url,
                desc: desc,
                chapters: episodes,
                total: epcount,
            };
        } catch (error) {
            throw new Error(`An error occured within the api: ${error}`);
        }
    }
    public fetchImages(id: string) {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "https://www.bilibilicomics.com/twirp/comic.v1.Comic/GetImageIndex?device=android&platform=app",
                    { ep_id: id }
                )
                .then((res) => {
                    let images: Array<any> = [];
                    res.data.data.images.forEach((img: any) => {
                        images.push(img.path);
                    });
                    return resolve(images);
                })
                .catch((err) => {
                    return reject(`An error occured within the api: ${err}`);
                });
        });
    }
    public getTokens(imgs: Array<any>) {
        return new Promise((resolve, reject) => {
            let img = "";
            imgs.forEach((val, key, arr) => {
                if (Object.is(arr.length - 1, key)) {
                    img += '"' + val + '"';
                } else {
                    img += '"' + val + '", ';
                }
            });
            axios
                .post(
                    "https://www.bilibilicomics.com/twirp/comic.v1.Comic/ImageToken?device=android&platform=app",
                    { urls: `[${img}]` }
                )
                .then((res) => {
                    let imgurls: Array<string> = [];
                    res.data.data.forEach((info) => {
                        imgurls.push(`${info.url}?token=${info.token}`);
                    });
                    return resolve(imgurls);
                })
                .catch((err) => {
                    return reject(`An error occured within the api: ${err}`);
                });
        });
    }
    public Search(query: string) {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "https://www.bilibilicomics.com/twirp/comic.v1.Comic/Search?device=android&platform=app",
                    {
                        style_id: -1,
                        area_id: -1,
                        is_finish: -1,
                        is_free: -1,
                        order: -1,
                        key_word: query,
                        page_num: 1,
                        page_size: 9,
                        need_shield_prefer: true,
                        style_prefer:
                            '[{"style_id":3,"prefer":2},{"style_id":11,"prefer":1},{"style_id":12,"prefer":2},{"style_id":13,"prefer":2},{"style_id":14,"prefer":1},{"style_id":15,"prefer":2},{"style_id":16,"prefer":1},{"style_id":17,"prefer":2},{"style_id":19,"prefer":2},{"style_id":20,"prefer":2},{"style_id":21,"prefer":1},{"style_id":22,"prefer":2},{"style_id":23,"prefer":1},{"style_id":30,"prefer":2},{"style_id":41,"prefer":2}]',
                    }
                )
                .then((res) => {
                    let results: Array<Comic> = [];
                    res.data.data.list.forEach((comic) => {
                        results.push({
                            id: comic.id,
                            title: comic.title.replace(/(<([^>]+)>)/gi, ""),
                            url: `https://www.bilibilicomics.com/detail/mc${comic.id}`,
                            authors: comic.author_name,
                            vcover: comic.vertical_cover,
                            hcover: comic.horizontal_cover,
                            genres: comic.styles,
                        });
                    });
                    return resolve(results);
                })
                .catch((err) => {
                    return reject(`An error occured within the api: ${err}`);
                });
        });
    }
    public getComicsByID(ids: Array<string>) {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "https://www.bilibilicomics.com/twirp/comic.v1.Comic/GetComicsByIDs?device=android&platform=app",
                    { ids: ids }
                )
                .then((res) => {
                    let results: Array<Comic> = [];
                    res.data.data.comics.forEach((comics) => {
                        results.push({
                            id: comics.id,
                            title: comics.title.replace(/(<([^>]+)>)/gi, ""),
                            url: `https://www.bilibilicomics.com/detail/mc${comics.id}`,
                            vcover: comics.vertical_cover,
                            hcover: comics.horizontal_cover,
                        });
                    });
                    return resolve(results);
                })
                .catch((err) => {
                    return reject(`An error occured within the api: ${err}`);
                });
        });
    }
    public getFeatured() {
        return new Promise<Array<Comic>>((resolve, reject) => {
            axios
                .post(
                    "https://www.bilibilicomics.com/twirp/comic.v1.Comic/GetClassPageSixComics?device=android&platform=app",
                    {
                        id: 3,
                        isAll: 0,
                        page_num: 2,
                        page_size: 6,
                        style_prefer:
                            '[{"style_id":3,"prefer":2},{"style_id":11,"prefer":1},{"style_id":12,"prefer":2},{"style_id":13,"prefer":2},{"style_id":14,"prefer":1},{"style_id":15,"prefer":2},{"style_id":16,"prefer":1},{"style_id":17,"prefer":2},{"style_id":19,"prefer":2},{"style_id":20,"prefer":2},{"style_id":21,"prefer":1},{"style_id":22,"prefer":2},{"style_id":23,"prefer":1},{"style_id":30,"prefer":2},{"style_id":41,"prefer":2}]',
                    }
                )
                .then((res) => {
                    let results: Array<Comic> = [];
                    res.data.data.roll_six_comics.forEach((comics) => {
                        results.push({
                            id: comics.id,
                            title: comics.title.replace(/(<([^>]+)>)/gi, ""),
                            url: `https://www.bilibilicomics.com/detail/mc${comics.id}`,
                            vcover: comics.vertical_cover,
                            hcover: comics.horizontal_cover,
                            authors: comics.author_name,
                            genres: comics.style,
                        });
                    });
                    return resolve(results);
                })
                .catch((err) => {
                    return reject(`An error occured within the api: ${err}`);
                });
        });
    }
    public getFavorites() {
        if (this.auth && this.area) {
            return new Promise<Array<Chapter>>((resolve, reject) => {
                axios
                    .post(
                        `https://${this.area === "us"
                            ? "us-user"
                            : this.area === "sg"
                                ? "sg-user"
                                : "www"
                        }.bilibilicomics.com/twirp/bookshelf.v1.Bookshelf/ListFavorite?device=android&platform=app`,
                        { page_num: 1, page_size: 50, order: 1 },
                        { headers: { Authorization: this.auth } }
                    )
                    .then((res) => {
                        let results: Array<Chapter> = [];
                        res.data.data.list.forEach((favorite) => {
                            this.getDetails(favorite.comic_id).then((comic: any) => {
                                results.push({
                                    id: favorite.comic_id,
                                    title: comic.title.replace(/(<([^>]+)>)/gi, ""),
                                    comic_url: `https://www.bilibilicomics.com/detail/mc${favorite.comic_id}`,
                                    last_chapter_id: favorite.last_ep_id,
                                    last_chapter: `https://www.bilibilicomics.com/mc${favorite.comic_id}/${favorite.last_ep_id}`,
                                });
                            });
                        });
                        setTimeout(() => {
                            return resolve(results);
                        }, 1500);
                    })
                    .catch((err) => {
                        return reject(`An error occured within the api: ${err}`);
                    });
            });
        } else {
            return new Promise((resolve, reject) => {
                return resolve(
                    `BiliBiliComics-API does not have an auth token and/or area assigned.`
                );
            });
        }
    }
    public refreshToken() {
        if (this.auth && this.area) {
            return new Promise<void>((resolve, reject) => {
                axios
                    .post(
                        `https://${this.area === "us"
                            ? "us-user"
                            : this.area === "sg"
                                ? "sg-user"
                                : "www"
                        }.bilibilicomics.com/twirp/global.v1.User/RefreshToken?device=android&platform=app`,
                        { refresh_token: this.refreshtoken },
                        { headers: { Authorization: this.auth } }
                    )
                    .then((res) => {
                        this.auth = res.data.data.access_token;
                        return resolve();
                    })
                    .catch((err) => {
                        return reject(`An error occured within the api: ${err}`);
                    });
            });
        } else {
            return new Promise((resolve, reject) => {
                return resolve(
                    `BiliBiliComics-API does not have an auth token and/or area assigned.`
                );
            });
        }
    }
}
