import { Body, Client, ClientOptions, getClient, HttpOptions, RequestOptions, Response } from "@tauri-apps/api/http";
import { Api_RequestERROR } from "../internal/Api_Request";

export default class Api_Request{
    private static url = "http://localhost:8145/";
    private static async client(options? : ClientOptions){
        return await getClient(options);
    }
    public static get_url() : string {
        return Api_Request.url;
    }
    public static async get_methods(to_use:string, options?: RequestOptions | undefined, client?: Client): Promise<Response<any>>{
        if(client == undefined){
            client = await Api_Request.client();
        }
        const getted = client.get(Api_Request.url + to_use, options);
        const result: any = await getted;
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            throw new Api_RequestERROR(result.data.errors[0].id, result.status, result.data.errors[0].title, result.data.errors[0].detail);
        }
    }
    public static async put_methods(to_use:string, body?: Body | undefined, options?: RequestOptions | undefined, client? : Client): Promise<Response<any>>{
        if(client == undefined){
            client = await Api_Request.client();
        }
        const getted = client.put(Api_Request.url + to_use, body,options);
        const result: any = await getted;
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            throw new Api_RequestERROR(result.data.errors[0].id, result.status, result.data.errors[0].title, result.data.errors[0].detail);
        }
    }
    public static async post_methods(to_use:string, body?: Body | undefined, options?: RequestOptions | undefined, client?: Client): Promise<Response<any>>{
        if(client == undefined){
            client = await Api_Request.client();
        }
        const getted = client.post(Api_Request.url + to_use, body, options);
        const result: any = await getted;
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            throw new Api_RequestERROR(result.data.errors[0].id, result.status, result.data.errors[0].title, result.data.errors[0].detail);
        }
    }
    public static async patch_methods(to_use:string, options?: RequestOptions | undefined, client?: Client): Promise<Response<any>>{
        if(client == undefined){
            client = await Api_Request.client();
        }
        const getted = client.patch(Api_Request.url + to_use, options);
        const result: any = await getted;
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            throw new Api_RequestERROR(result.data.errors[0].id, result.status, result.data.errors[0].title, result.data.errors[0].detail);
        }
    }
    public static async delete_methods(to_use:string, options?: RequestOptions | undefined, client?: Client): Promise<Response<any>>{
        if(client == undefined){
            client = await Api_Request.client();
        }
        const getted = client.delete(Api_Request.url + to_use, options);
        const result: any = await getted;
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            throw new Api_RequestERROR(result.data.errors[0].id, result.status, result.data.errors[0].title, result.data.errors[0].detail);
        }
    }
    public static async request_methods(httpOptions: HttpOptions, client? : Client): Promise<Response<any>>{
        if(client == undefined){
            client = await Api_Request.client();
        }
        const getted = client.request(httpOptions);
        let request_res : Response<any>;
        request_res = await getted;
        return request_res;
    }
    public static async ping(client? : Client): Promise<boolean>{
        try{
            return (await Api_Request.get_methods("", undefined, client)).ok;
        }catch(e){
            return false;
        }
    }
}