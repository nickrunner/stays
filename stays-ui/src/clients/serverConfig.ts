import {AxiosRequestConfig} from "axios";
import { AuthClient } from "./authClient";

//export const BASE_URL = "http://localhost:3001"
//export const BASE_URL = "http://192.168.86.206:3001"
export const BASE_URL = "https://stays-platform.uc.r.appspot.com"


export function cfg():AxiosRequestConfig {
    return {
        baseURL: BASE_URL
    }
}

export async function defCfg(): Promise<AxiosRequestConfig>
{
    const token = await new AuthClient().getToken(1000);
    return {
        baseURL: BASE_URL,
        headers: {
            Authorization: "Bearer "+token
        }
    }
}

export async function queryCfg(params: any): Promise<AxiosRequestConfig> 
{
    const config = await defCfg();
    config.params = params;
    return config;
}