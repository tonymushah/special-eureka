import { Body, Client, ClientOptions, getClient, HttpOptions, RequestOptions, Response } from "@tauri-apps/api/http";
import { Api_RequestERROR } from "../internal/Api_Request";
import { is_server_started } from "./plugin";

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
        const result: Response<any> = await getted;
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            throw new Error(result.data.message);
        }
    }
    public static async put_methods(to_use:string, body?: Body | undefined, options?: RequestOptions | undefined, client? : Client): Promise<Response<any>>{
        if(client == undefined){
            client = await Api_Request.client();
        }
        const getted = client.put(Api_Request.url + to_use, body,options);
        const result: Response<any> = await getted;
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            throw new Error(result.data.message);
        }
    }
    public static async post_methods(to_use:string, body?: Body | undefined, options?: RequestOptions | undefined, client?: Client): Promise<Response<any>>{
        if(client == undefined){
            client = await Api_Request.client();
        }
        const getted = client.post(Api_Request.url + to_use, body, options);
        const result: Response<any> = await getted;
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            throw new Error(result.data.message);
        }
    }
    public static async patch_methods(to_use:string, options?: RequestOptions | undefined, client?: Client): Promise<Response<any>>{
        if(client == undefined){
            client = await Api_Request.client();
        }
        const getted = client.patch(Api_Request.url + to_use, options);
        const result: Response<any> = await getted;
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            throw new Error(result.data.message);
        }
    }
    public static async delete_methods(to_use:string, options?: RequestOptions | undefined, client?: Client): Promise<Response<any>>{
        if(client == undefined){
            client = await Api_Request.client();
        }
        const getted = client.delete(Api_Request.url + to_use, options);
        const result: Response<any> = await getted;
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            throw new Error(result.data.message);
        }
    }
    public static async request_methods(httpOptions: HttpOptions, client? : Client): Promise<Response<any>>{
        if(client == undefined){
            client = await Api_Request.client();
        }
        const getted = client.request(httpOptions);
        return await getted;
    }
    public static async ping(client? : Client): Promise<boolean>{
        try{
            return is_server_started();
        }catch(e){
            return false;
        }
    }
}