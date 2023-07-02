/// TODO Make request type safe 

import { Body, Client, ClientOptions, getClient, HttpOptions, RequestOptions, Response, ResponseType } from "@tauri-apps/api/http";
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
    private static url = "https://api.mangadex.org/";
    private static async client(options? : ClientOptions){
        return await getClient(options);
    }
    public static get_url() : string {
        return Api_Request.url;
    }
    public static async get_methods<T = unknown>(to_use:string, options?: RequestOptions | undefined, client?: Client): Promise<Response<T>>{
        let is_client_initialized = false;
        if(client == undefined){
            client = await Api_Request.client();
            is_client_initialized = true;
        }
        const result = await client.get<T>(Api_Request.url + to_use, options);
        if(is_client_initialized){
            client.drop();
        }
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            throw new Api_RequestERROR(result.data.errors[0].id, result.status, result.data.errors[0].title, result.data.errors[0].detail);
        }
    }
    public static async put_methods<T = unknown>(to_use:string, body?: Body | undefined, options?: RequestOptions | undefined, client? : Client): Promise<Response<any>>{
        let is_client_initialized = false;
        if(client == undefined){
            client = await Api_Request.client();
            is_client_initialized = true;
        }
        const getted = client.put(Api_Request.url + to_use, body,options);
        const result: any = await getted;
        if(is_client_initialized){
            client.drop();
        }
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            throw new Api_RequestERROR(result.data.errors[0].id, result.status, result.data.errors[0].title, result.data.errors[0].detail);
        }
    }
    public static async post_methods(to_use:string, body?: Body | undefined, options?: RequestOptions | undefined, client?: Client): Promise<Response<any>>{
        let is_client_initialized = false;
        if(client == undefined){
            client = await Api_Request.client();
            is_client_initialized = true;
        }
        const getted = client.post(Api_Request.url + to_use, body, options);
        const result: any = await getted;
        if(is_client_initialized){
            client.drop();
        }
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            throw new Api_RequestERROR(result.data.errors[0].id, result.status, result.data.errors[0].title, result.data.errors[0].detail);
        }
    }
    public static async patch_methods(to_use:string, options?: RequestOptions | undefined, client?: Client): Promise<Response<any>>{
        let is_client_initialized = false;
        if(client == undefined){
            client = await Api_Request.client();
            is_client_initialized = true;
        }
        const getted = client.patch(Api_Request.url + to_use, options);
        const result: any = await getted;
        if(is_client_initialized){
            client.drop();
        }
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            throw new Api_RequestERROR(result.data.errors[0].id, result.status, result.data.errors[0].title, result.data.errors[0].detail);
        }
    }
    public static async delete_methods(to_use:string, options?: RequestOptions | undefined, client?: Client): Promise<Response<any>>{
        let is_client_initialized = false;
        if(client == undefined){
            client = await Api_Request.client();
            is_client_initialized = true;
        }
        const getted = client.delete(Api_Request.url + to_use, options);
        const result: any = await getted;
        if(is_client_initialized){
            client.drop();
        }
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            throw new Api_RequestERROR(result.data.errors[0].id, result.status, result.data.errors[0].title, result.data.errors[0].detail);
        }
    }
    public static async request_methods(httpOptions: HttpOptions, client? : Client): Promise<Response<any>>{
        let is_client_initialized = false;
        if(client == undefined){
            client = await Api_Request.client();
            is_client_initialized = true;
        }
        const getted = client.request(httpOptions);
        const request_res : Response<any> = await getted;
        if(is_client_initialized){
            client.drop();
        }
        return request_res;
    }
    public static async ping(client? : Client): Promise<boolean>{
        try{
            return (await Api_Request.get_methods("ping", {
                "responseType" : ResponseType.Text
            }, client)).ok;
        }catch(e){
            return false;
        }
    }
}