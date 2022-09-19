import axios from "axios";
import useSWR from "swr";
import React, { useCallback } from "react";

export const useAxios = () => {
  const instance = axios.create({
    baseURL: "/api",
  });

  const fetcher = useCallback(
    async (url: string) => await instance.get(url).then((res) => res.data),
    []
  );

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      console.log({ requestError: error });
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log({ responseError: error });
      return Promise.reject(error);
    }
  );

  return { instance, fetcher };
};
