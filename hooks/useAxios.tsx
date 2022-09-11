import axios from "axios";

import React from "react";

export const useAxios = () => {
  const instance = axios.create({
    baseURL: "/",
  });

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

  return instance;
};
