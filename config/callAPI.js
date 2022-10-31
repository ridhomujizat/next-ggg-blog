import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const axiosCreate = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

export default async function callAPI({
  url,
  method,
  data,
  token,
  params,
  // serverToken,
}) {
  let headers = {
    "Access-Control-Allow-Origin": "*"
  };
  if (token) {
    const tokenCookies = Cookies.get("token");
    if (tokenCookies) {
      headers = {
        ...headers,
        Authorization: `Bearer ${tokenCookies}`,
      };
    }
  }

  try {
    const response = await axiosCreate({
      url,
      method,
      data,
      headers,
      params,
    })
    if (response.status > 300) {
      const res = {
        error: true,
        message: response.data.statusMessage,
        data: null,
      };
      return res;
    }

    const res = response?.data;
    return res;
  } catch (error) {
    const res = {
      error: true,
      message: error?.message ? error.message : "Network error please try again",
      data: null,
    };
    return res;
  }
}
