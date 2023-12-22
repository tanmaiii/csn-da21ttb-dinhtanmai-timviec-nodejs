import axios from "axios";

//http://localhost:8800
//https://nodejs-mysql-y4nx.onrender.com
//https://api-job.vercel.app
const baseURL = "http://localhost:8800";

export const apiImage = `${baseURL}/images/`;

export const apiCv = `${baseURL}/cv/`;

export const makeRequest = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true,
});
