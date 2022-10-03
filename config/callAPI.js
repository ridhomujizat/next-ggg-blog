import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const axiosCreate = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API
})

export default async function callAPI({
  url,
  method,
  data,
  token,
  params
  // serverToken,
}) {
  let headers = {};
  if (token) {
    const tokenCookies = Cookies.get("token");
    if (tokenCookies) {
      headers = {
        Authorization: `Bearer ${tokenCookies}`,
      };
    }
  }
  const response = await axiosCreate({
    url,
    method,
    data,
    headers,
    params
  }).catch((err) => err.response);
  if (response.status > 300) {
    const res = {
      error: true,
      message: response.data.statusMessage,
      data: null,
    };
    return res;
  }


  const res = response.data
  return res;
}
