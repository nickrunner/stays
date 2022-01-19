import {AxiosRequestConfig} from "axios";
import { AuthClient } from "./authClient";

export const BASE_URL = "http://localhost:3000"

export async function defCfg(): Promise<AxiosRequestConfig>
{
    const token = await new AuthClient().getToken();
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