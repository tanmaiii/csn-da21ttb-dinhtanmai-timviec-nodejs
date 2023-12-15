import axios from 'axios'

export const apiImage = "http://localhost:8800/images/"
export const apiCv = "http://localhost:8800/cv/"

export const makeRequest = axios.create({
    baseURL: "http://localhost:8800/api",
    withCredentials: true
})