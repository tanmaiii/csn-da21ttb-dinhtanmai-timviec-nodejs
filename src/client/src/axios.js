import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

export const apiImage = `${baseURL}/images/`;

export const apiCv = `${baseURL}/cv/`;

export const makeRequest = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  withCredentials: true,
});
