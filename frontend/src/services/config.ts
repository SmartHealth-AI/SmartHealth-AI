import axios, { AxiosError, AxiosResponse } from "axios";

import get from "lodash/get";

import qs from "qs";

import { ApiUrl } from "@/utils/Config";
import { getToken, getRefreshToken, setToken, deleteRefreshToken, deleteToken } from "@/utils/cookie";
import { showMessageError } from "@/utils/toast";

import { translate } from "@/locales";

const instance = axios.create({
  baseURL: ApiUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => qs.stringify(params),
});

export const instanceWithoutAuth = axios.create({
  baseURL: ApiUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => qs.stringify(params),
});
instance.interceptors.request.use(
  async (config: any) => {
    const accessToken = getToken();
    if (accessToken) {
       config.headers = {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
        Accept: "application/json",
      };
    } else {
      config.headers = {
        Accept: "application/json",
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

const onRefreshToken = async () => {
  let refreshToken = getRefreshToken();

  return axios.post(ApiUrl + "/v1/users/refresh_token", { refresh_token: refreshToken });
};

const successHandler = async (response: AxiosResponse) => {
  return response;
};

const errorHandler = async (error: any) => {

  const resError: AxiosResponse<any> | undefined = error.response;
  const originalConfig: any = error.config;
  const refreshToken = getRefreshToken();
  if (refreshToken && resError?.status === 401 && resError?.data?.error.message === 'unauthorized' && !originalConfig._retry || refreshToken && resError?.status === 422 && resError?.data?.error.message === 'invalid_refresh_token' && !originalConfig._retry) {
    originalConfig._retry = true;
    try {
      const data: any = await onRefreshToken();
      if (data?.data?.data?.access_token) {
        setToken(data?.data?.data?.access_token);
      } else {
          await deleteToken();
          await deleteRefreshToken();
          window.location.href = "/authentication/sign-in";
      }
    } catch (err: any) {
       const resError: AxiosResponse<any> | undefined = error.response;
      if (resError?.status === 422 && resError?.data?.error.message === 'invalid_refresh_token' || resError?.status === 401 && resError?.data?.error.message === 'unauthorized') {
          await deleteToken();
          await deleteRefreshToken();
          window.location.href = "/authentication/sign-in";
      }
    }
    return instance(originalConfig);
  }
  showMessageError({ content: translate(get(resError, "data.error.message")) });
  return Promise.reject({ ...resError?.data });
};

instance.interceptors.response.use(
  (response: any) => successHandler(response),
  (error: any) => errorHandler(error),
);

export default instance;
