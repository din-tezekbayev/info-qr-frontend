import '@/assets/styles/nprogress.css'

import axios from 'axios'
import NProgress from 'nprogress'

import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import {StorageService} from '@/services/storage.service';

const ApiService = {
  init(baseURL: string) {
    axios.defaults.baseURL = baseURL;
    axios.interceptors.request.use((config) => {
      NProgress.start();
      return config;
    });
    axios.interceptors.response.use(
      (response) => {
        NProgress.done();
        return response;
      },
      (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          console.log('error 401!');
        }
        NProgress.done();
        return Promise.reject(error);
      }
    );
  },

  setHeaders() {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${StorageService.getToken()}`;
    axios.defaults.headers.common['Prefer'] = 'return=representation';
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Accept,Authorization,Content-Type,Origin,Referer,User-Agent,Prefer,X-Requested';
    axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  },

  removeHeaders() {
    axios.defaults.headers.common = {};
    axios.defaults.headers.post = {};
  },

  get<T = any, R = AxiosResponse<T>>(
    resource: string,
    config?: AxiosRequestConfig
  ) {
    return axios.get<T, R>(resource, config);
  },

  post<T = any, R = AxiosResponse<T>>(
    resource: string,
    data: any,
    config?: AxiosRequestConfig
  ) {
    return axios.post<T, R>(resource, data, config);
  },

  put<T = any, R = AxiosResponse<T>>(
    resource: string,
    data: any,
    config?: AxiosRequestConfig
  ) {
    return axios.put<T, R>(resource, data, config);
  },

  delete<T = any, R = AxiosResponse<T>>(resource: any) {
    return axios.delete<T, R>(resource);
  },

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
   **/
  customRequest(config: any) { return axios(config) }
};

export default ApiService;
