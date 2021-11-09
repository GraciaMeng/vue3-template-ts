/**
 * axios基础构建
 */

import getUrl from "./config";
import instance from "./api";
import { AxiosRequest, CustomResponse } from "./types";

class Abstract {
  // 外部传入的baseUrl
  protected baseURL = "/api";
  // 自定义header头
  // eslint-disable-next-line @typescript-eslint/ban-types
  protected headers: Object = {
    ContentType: "application/json;charset=UTF-8",
  };

  private apiAxios({
    baseURL = this.baseURL,
    headers = this.headers,
    method,
    url,
    data,
    params,
    responseType,
  }: AxiosRequest): Promise<CustomResponse> {
    // url解析
    const _url = (url as string).split(".");
    url = getUrl(_url[0], _url[1]);

    return new Promise((resolve, reject) => {
      instance({
        baseURL,
        headers,
        method,
        url,
        params,
        data,
        responseType,
      })
        .then((res) => {
          const { data, code, msg } = res.data;
          // 200:服务端业务处理正常结束
          if (code === 200) {
            if (msg === "success") {
              resolve({
                status: true,
                message: "success",
                data,
                // origin: data,
              });
            } else {
              resolve({
                status: false,
                message: res.data?.errorMessage || url + "请求失败",
                data: res.data?.data,
                origin: res.data,
              });
            }
          } else {
            resolve({
              status: false,
              message: res.data?.errorMessage || url + "请求失败",
              data: null,
            });
          }
        })
        .catch((err) => {
          const message =
            err?.data?.errorMessage || err?.message || url + "请求失败";
          reject({ status: false, message, data: null });
        });
    });
  }

  /**
   * GET类型的网络请求
   */
  protected getReq({
    baseURL,
    headers,
    url,
    data,
    params,
    responseType,
  }: AxiosRequest): Promise<CustomResponse> {
    return this.apiAxios({
      baseURL,
      headers,
      method: "GET",
      url,
      data,
      params,
      responseType,
    });
  }

  /**
   * POST类型的网络请求
   */
  protected postReq({
    baseURL,
    headers,
    url,
    data,
    params,
    responseType,
  }: AxiosRequest): Promise<CustomResponse> {
    return this.apiAxios({
      baseURL,
      headers,
      method: "POST",
      url,
      data,
      params,
      responseType,
    });
  }

  /**
   * PUT类型的网络请求
   */
  protected putReq({
    baseURL,
    headers,
    url,
    data,
    params,
    responseType,
  }: AxiosRequest): Promise<CustomResponse> {
    return this.apiAxios({
      baseURL,
      headers,
      method: "PUT",
      url,
      data,
      params,
      responseType,
    });
  }

  /**
   * DELETE类型的网络请求
   */
  protected deleteReq({
    baseURL,
    headers,
    url,
    data,
    params,
    responseType,
  }: AxiosRequest): Promise<CustomResponse> {
    return this.apiAxios({
      baseURL,
      headers,
      method: "DELETE",
      url,
      data,
      params,
      responseType,
    });
  }
}

export default Abstract;
