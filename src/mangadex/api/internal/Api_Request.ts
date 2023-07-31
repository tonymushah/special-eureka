/// TODO Make request type safe 

import { ErrorResponse } from "../sta/data-contracts";
import { getName, getTauriVersion, getVersion } from "@tauri-apps/api/app";
import { platform } from "@tauri-apps/api/os";
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
        const options_ : RequestOptions = options ?? {};
        const headers = options_.headers ?? {};
        headers["User-Agent"] = `${await getName()}/${await getVersion()} (Tauri; ${await getTauriVersion()}) (platform; ${await platform()})`;
        options_.headers = headers;
        const result = await client.get<never>(Api_Request.url + to_use, options_);
        if(is_client_initialized){
            await client.drop();
        }
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            const error : ErrorResponse = result.data;
            throw new Api_RequestERROR(error.errors?.[0].id ?? "unknown", result.status, error.errors?.[0].title ?? "Unknown", error.errors?.[0].detail ?? "Unknown");
        }
    }
    public static async put_methods<T = unknown>(to_use:string, body?: Body | undefined, options?: RequestOptions | undefined, client? : Client): Promise<Response<T>>{
        let is_client_initialized = false;
        if(client == undefined){
            client = await Api_Request.client();
            is_client_initialized = true;
        }
        const options_ : RequestOptions = options ?? {};
        const headers = options_.headers ?? {};
        headers["User-Agent"] = `${await getName()}/${await getVersion()} (Tauri; ${await getTauriVersion()}) (platform; ${await platform()})`;
        options_.headers = headers;
        const result = await client.put<never>(Api_Request.url + to_use, body, options_);
        if(is_client_initialized){
            await client.drop();
        }
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            const error : ErrorResponse = result.data;
            throw new Api_RequestERROR(error.errors?.[0].id ?? "unknown", result.status, error.errors?.[0].title ?? "Unknown", error.errors?.[0].detail ?? "Unknown");
        }
    }
    public static async post_methods<T = unknown>(to_use:string, body?: Body | undefined, options?: RequestOptions | undefined, client?: Client): Promise<Response<T>>{
        let is_client_initialized = false;
        if(client == undefined){
            client = await Api_Request.client();
            is_client_initialized = true;
        }
        const options_ : RequestOptions = options ?? {};
        const headers = options_.headers ?? {};
        headers["User-Agent"] = `${await getName()}/${await getVersion()} (Tauri; ${await getTauriVersion()}) (platform; ${await platform()})`;
        options_.headers = headers;
        const result = await client.post<never>(Api_Request.url + to_use, body, options_);
        if(is_client_initialized){
            await client.drop();
        }
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            const error : ErrorResponse = result.data;
            throw new Api_RequestERROR(error.errors?.[0].id ?? "unknown", result.status, error.errors?.[0].title ?? "Unknown", error.errors?.[0].detail ?? "Unknown");
        }
    }
    public static async patch_methods<T = unknown>(to_use:string, options?: RequestOptions | undefined, client?: Client): Promise<Response<T>>{
        let is_client_initialized = false;
        if(client == undefined){
            client = await Api_Request.client();
            is_client_initialized = true;
        }
        const options_ : RequestOptions = options ?? {};
        const headers = options_.headers ?? {};
        headers["User-Agent"] = `${await getName()}/${await getVersion()} (Tauri; ${await getTauriVersion()}) (platform; ${await platform()})`;
        options_.headers = headers;
        const result = await client.patch<never>(Api_Request.url + to_use, options_);
        if(is_client_initialized){
            await client.drop();
        }
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            const error : ErrorResponse = result.data;
            throw new Api_RequestERROR(error.errors?.[0].id ?? "unknown", result.status, error.errors?.[0].title ?? "Unknown", error.errors?.[0].detail ?? "Unknown");
        }
    }
    public static async delete_methods<T = unknown>(to_use:string, options?: RequestOptions | undefined, client?: Client): Promise<Response<T>>{
        let is_client_initialized = false;
        if(client == undefined){
            client = await Api_Request.client();
            is_client_initialized = true;
        }
        const options_ : RequestOptions = options ?? {};
        const headers = options_.headers ?? {};
        headers["User-Agent"] = `${await getName()}/${await getVersion()} (Tauri; ${await getTauriVersion()}) (platform; ${await platform()})`;
        options_.headers = headers;
        const result = await client.delete<never>(Api_Request.url + to_use, options_);
        if(is_client_initialized){
            await client.drop();
        }
        if(result.status >= 200 && result.status < 400 && result.ok == true){
            return result;
        }else{
            const error : ErrorResponse = result.data;
            throw new Api_RequestERROR(error.errors?.[0].id ?? "unknown", result.status, error.errors?.[0].title ?? "Unknown", error.errors?.[0].detail ?? "Unknown");
        }
    }
    public static async request_methods<T = unknown>(httpOptions: HttpOptions, client? : Client): Promise<Response<unknown>>{
        let is_client_initialized = false;
        if(client == undefined){
            client = await Api_Request.client();
            is_client_initialized = true;
        }
        const request_res : Response<T> = await client.request<T>(httpOptions);
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