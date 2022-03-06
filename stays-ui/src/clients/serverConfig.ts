import { AxiosRequestConfig } from "axios";

import { default as config } from "../../config.json";
import { AuthClient } from "./authClient";

export let BASE_URL = "";

switch (config.platform.env) {
  case "dev":
    BASE_URL = "https://platform-dot-stays-dev.uc.r.appspot.com";
    break;
  case "prod":
    BASE_URL = "https://platform-dot-stays-prod.uc.r.appspot.com";
    break;
  case "local":
    BASE_URL = "http://192.168.86.206:3001";
    break;
}

export function cfg(): AxiosRequestConfig {
  return {
    baseURL: BASE_URL
  };
}

export async function defCfg(): Promise<AxiosRequestConfig> {
  const token = await new AuthClient().getToken(1000);
  return {
    baseURL: BASE_URL,
    headers: {
      Authorization: "Bearer " + token
    }
  };
}

export async function queryCfg(params: any, skipAuth?: boolean): Promise<AxiosRequestConfig> {
  const config = skipAuth ? cfg() : await defCfg();
  config.params = params;
  return config;
}
