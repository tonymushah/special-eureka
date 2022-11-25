import { Body, Client, getClient, HttpOptions, RequestOptions, Response } from "@tauri-apps/api/http";
const client:Client = await getClient();

export default class Api_Request{
    private static url:string = "http://localhost:8090/";
    public static get_url() : string {
        return Api_Request.url;
    }
    public static async get_methods(to_use:string, options?: RequestOptions | undefined): Promise<Response<any>>{
        var getted = client.get(Api_Request.url + to_use, options);
        var result = await getted;
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            throw new Api_RequestERROR(result.data.errors[0].id, result.status, result.data.errors[0].title, result.data.errors[0].detail);
        }
    }
    public static async put_methods(to_use:string, body?: Body | undefined, options?: RequestOptions | undefined): Promise<Response<any>>{
        var getted = client.put(Api_Request.url + to_use, body,options);
        var result = await getted;
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            throw new Api_RequestERROR(result.data.errors[0].id, result.status, result.data.errors[0].title, result.data.errors[0].detail);
        }
    }
    public static async post_methods(to_use:string, body?: Body | undefined, options?: RequestOptions | undefined): Promise<Response<any>>{
        var getted = client.post(Api_Request.url + to_use, body, options);
        var result = await getted;
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            throw new Api_RequestERROR(result.data.errors[0].id, result.status, result.data.errors[0].title, result.data.errors[0].detail);
        }
    }
    public static async patch_methods(to_use:string, options?: RequestOptions | undefined): Promise<Response<any>>{
        var getted = client.patch(Api_Request.url + to_use, options);
        var result = await getted;
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            throw new Api_RequestERROR(result.data.errors[0].id, result.status, result.data.errors[0].title, result.data.errors[0].detail);
        }
    }
    public static async delete_methods(to_use:string, options?: RequestOptions | undefined): Promise<Response<any>>{
        var getted = client.delete(Api_Request.url + to_use, options);
        var result = await getted;
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            throw new Api_RequestERROR(result.data.errors[0].id, result.status, result.data.errors[0].title, result.data.errors[0].detail);
        }
    }
    public static async request_methods(httpOptions: HttpOptions): Promise<Response<any>>{
        var getted = client.request(httpOptions);
        var request_res : Response<any>;
        request_res = await getted;
        return request_res;
    }
    public static async ping(): Promise<boolean>{
        try {
            return (await Api_Request.get_methods("")).ok;
        } catch (error) {
            return false;
        }
    }
}