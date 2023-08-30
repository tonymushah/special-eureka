import { Body, Client, ClientOptions, getClient, RequestOptions, Response } from "@tauri-apps/api/http";
import { is_server_started } from "./plugin";

export default class Api_Request{
    private static url = "http://localhost:8145/";
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
        const result = await client.get<never>(Api_Request.url + to_use, options);
        if(is_client_initialized){
            await client.drop();
        }
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            const res : {
                result : string,
                message : string
            } = result.data;
            throw new Error(res.message);
        }
    }
    public static async put_methods<T = unknown>(to_use:string, body?: Body | undefined, options?: RequestOptions | undefined, client? : Client): Promise<Response<T>>{
        let is_client_initialized = false;
        if(client == undefined){
            client = await Api_Request.client();
            is_client_initialized = true;
        }
        const result = await client.put<never>(Api_Request.url + to_use, body,options);
        if(is_client_initialized){
            await client.drop();
        }
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            const res : {
                result : string,
                message : string
            } = result.data;
            throw new Error(res.message);
        }
    }
    public static async post_methods<T = unknown>(to_use:string, body?: Body | undefined, options?: RequestOptions | undefined, client?: Client): Promise<Response<T>>{
        let is_client_initialized = false;
        if(client == undefined){
            client = await Api_Request.client();
            is_client_initialized = true;
        }
        const result = await client.post<never>(Api_Request.url + to_use, body, options);
        if(is_client_initialized){
            await client.drop();
        }
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            const res : {
                result : string,
                message : string
            } = result.data;
            throw new Error(res.message);
        }
    }
    public static async patch_methods<T = unknown>(to_use:string, options?: RequestOptions | undefined, client?: Client): Promise<Response<T>>{
        let is_client_initialized = false;
        if(client == undefined){
            client = await Api_Request.client();
            is_client_initialized = true;
        }
        const result = await client.patch<never>(Api_Request.url + to_use, options);
        if(is_client_initialized){
            await client.drop();
        }
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            const res : {
                result : string,
                message : string
            } = result.data;
            throw new Error(res.message);
        }
    }
    public static async delete_methods<T = unknown>(to_use:string, options?: RequestOptions | undefined, client?: Client): Promise<Response<T>>{
        let is_client_initialized = false;
        if(client == undefined){
            client = await Api_Request.client();
            is_client_initialized = true;
        }
        const result = await client.delete<never>(Api_Request.url + to_use, options);
        if(is_client_initialized){
            await client.drop();
        }
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            const res : {
                result : string,
                message : string
            } = result.data;
            throw new Error(res.message);
        }
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static async ping(_client? : Client): Promise<boolean>{
        try{
            return await is_server_started();
        }catch(e){
            return false;
        }
    }
}