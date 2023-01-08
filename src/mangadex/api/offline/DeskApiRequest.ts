import { Body, Client, ClientOptions, getClient, HttpOptions, RequestOptions, Response } from "@tauri-apps/api/http";
import { Api_RequestERROR } from "../internal/Api_Request";

export default class Api_Request{
    private static url:string = "http://localhost:8145/";
    private static async client(options?: ClientOptions){
        return await getClient(options);
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
            throw new Api_RequestERROR(result.data.id, result.status, "desktop error", result.data.message);
        }
    }
    public static async put_methods(to_use:string, body?: Body | undefined, options?: RequestOptions | undefined): Promise<Response<any>>{
        let client = await Api_Request.client();
        let getted = client.put(Api_Request.url + to_use, body,options);
        let result: any = await getted;
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            throw new Api_RequestERROR(result.data.id, result.status, "desktop error", result.data.message);
        }
    }
    public static async post_methods(to_use:string, body?: Body | undefined, options?: RequestOptions | undefined): Promise<Response<any>>{
        let client = await Api_Request.client();
        let getted = client.post(Api_Request.url + to_use, body, options);
        let result: any = await getted;
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            throw new Api_RequestERROR(result.data.id, result.status, "desktop error", result.data.message);
        }
    }
    public static async patch_methods(to_use:string, options?: RequestOptions | undefined): Promise<Response<any>>{
        let client = await Api_Request.client();
        try {
            let result: Response<any> = await client.patch(Api_Request.url + to_use, options);
            if(result.status >= 200 && result.status < 400 && result.ok == true){
                return result;
            }else{
                throw new Api_RequestERROR(result.data.id, result.status, "desktop error", result.data.message);
            }
        } catch (error) {
            throw error;
        }
        
    }
    public static async delete_methods(to_use:string, options?: RequestOptions | undefined): Promise<Response<any>>{
        let client = await Api_Request.client();
        let getted = client.delete(Api_Request.url + to_use, options);
        let result: any = await getted;
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            throw new Api_RequestERROR(result.data.id, result.status, "desktop error", result.data.message);
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
            return (await Api_Request.get_methods("")).ok;
        }catch(e){
            return false;
        }
    }
}