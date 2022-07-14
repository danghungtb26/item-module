import axios from 'axios'

const request = axios.create({
  // withCredentials: true,
  timeout: 5000,
  baseURL: process.env.REACT_APP_API_HOST,
})

export const config = (baseURL: string) => {
  request.defaults.baseURL = baseURL
}

request.interceptors.request.use(config => {
  return {
    ...config,
    headers: {
      ...(config?.headers || {}),
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }
})

export default request

export type RequestType = typeof request
