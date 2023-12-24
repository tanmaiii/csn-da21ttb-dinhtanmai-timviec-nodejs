import axios from "axios";

//https://csn-api.onrender.com
//http://localhost:8800
//https://nodejs-mysql-y4nx.onrender.com
//https://api-job.vercel.app

console.log(process.env);

const baseURL = process.env.REACT_APP_API_URL;


export const apiImage = `${baseURL}/images/`;

export const apiCv = `${baseURL}/cv/`;

export const makeRequest = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  withCredentials: true,
});
