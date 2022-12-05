import { Body, Client, getClient, HttpOptions, RequestOptions, Response } from "@tauri-apps/api/http";
export class Api_RequestERROR extends Error{
    protected id: string;
    protected status: number;
    protected title: string;
    protected detail: string;
    public constructor(id: string, status: number, title: string, detail: string) {
        super(detail);
        this.detail = detail;
        this.id = id;
        this.title = title;
        this.status = status;
    }
    public getID(): string{
        return this.id;
    }
    public getStatus(): number{
        return this.status;
    }
    protected getTitle(): string{
        return this.title;
    }
    protected getDetail(): string{
        return this.detail;
    }
}
export class Api_Request{
    private static url:string = "https://api.mangadex.org/";
    private static async client(){
        return await getClient();
    }
    public static get_url() : string {
        return Api_Request.url;
    }
    public static async get_methods(to_use:string, options?: RequestOptions | undefined): Promise<Response<any>>{
        let client = await Api_Request.client();
        let getted = client.get(Api_Request.url + to_use, options);
        let result: any = await getted;
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            throw new Api_RequestERROR(result.data.errors[0].id, result.status, result.data.errors[0].title, result.data.errors[0].detail);
        }
    }
    public static async put_methods(to_use:string, body?: Body | undefined, options?: RequestOptions | undefined): Promise<Response<any>>{
        let client = await Api_Request.client();
        let getted = client.put(Api_Request.url + to_use, body,options);
        let result: any = await getted;
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            throw new Api_RequestERROR(result.data.errors[0].id, result.status, result.data.errors[0].title, result.data.errors[0].detail);
        }
    }
    public static async post_methods(to_use:string, body?: Body | undefined, options?: RequestOptions | undefined): Promise<Response<any>>{
        let client = await Api_Request.client();
        let getted = client.post(Api_Request.url + to_use, body, options);
        let result: any = await getted;
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            throw new Api_RequestERROR(result.data.errors[0].id, result.status, result.data.errors[0].title, result.data.errors[0].detail);
        }
    }
    public static async patch_methods(to_use:string, options?: RequestOptions | undefined): Promise<Response<any>>{
        let client = await Api_Request.client();
        let getted = client.patch(Api_Request.url + to_use, options);
        let result: any = await getted;
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            throw new Api_RequestERROR(result.data.errors[0].id, result.status, result.data.errors[0].title, result.data.errors[0].detail);
        }
    }
    public static async delete_methods(to_use:string, options?: RequestOptions | undefined): Promise<Response<any>>{
        let client = await Api_Request.client();
        let getted = client.delete(Api_Request.url + to_use, options);
        let result: any = await getted;
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            throw new Api_RequestERROR(result.data.errors[0].id, result.status, result.data.errors[0].title, result.data.errors[0].detail);
        }
    }
    public static async request_methods(httpOptions: HttpOptions): Promise<Response<any>>{
        let client = await Api_Request.client();
        let getted = client.request(httpOptions);
        let request_res : Response<any>;
        request_res = await getted;
        return request_res;
    }
    public static async ping(): Promise<boolean>{
        try{
            return (await Api_Request.get_methods("ping")).ok;
        }catch(e){
            return false;
        }
    }
}