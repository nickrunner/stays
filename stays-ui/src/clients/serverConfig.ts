import { AxiosRequestConfig } from "axios";

import { default as config } from "../../config.json";
import { AuthClient } from "./authClient";

export let BASE_URL = "";

switch (config.platform.env) {
  case "dev":
    BASE_URL = "https://stays-platform-ducbymrn2a-uc.a.run.app";
    break;
  case "prod":
    BASE_URL = "https://stays-platform-cqnprd4uoa-uc.a.run.app";
    break;
  case "local":
    BASE_URL = "http://192.168.86.233:3001";
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
    timeout: 30000,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  };
}

export async function queryCfg(params: any, skipAuth?: boolean): Promise<AxiosRequestConfig> {
  const config = skipAuth ? cfg() : await defCfg();
  config.params = params;
  return config;
}
